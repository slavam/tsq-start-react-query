import { test, expect } from '@playwright/test';

test.describe('ForecastPage Component', () => {
  test.describe('Page Load and Rendering', () => {
    test('should load forecast page successfully', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Проверяем заголовок страницы
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('Прогноз погоды в г. Донецк');
      
      // Проверяем наличие компонента ForecastLinks
      await expect(page.getByRole('link', { name: 'Сегодня', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Завтра', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Послезавтра', exact: true })).toBeVisible();
      
      // Проверяем наличие таблицы с прогнозом
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      await expect(page.locator('th:has-text("Min:")')).toBeVisible();
      
      // Проверяем футер
      await expect(page.locator('.copyright')).toBeVisible();
      await expect(page.locator('.copyright a[href="https://www.weatherapi.com"]')).toBeVisible();
    });

    test('should display correct date for today', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=0');
      
      const heading = page.getByRole('heading', { level: 1 });
      const headingText = await heading.textContent();
      
      // Получаем текущую дату на русском
      const today = new Date();
      const dateString = today.toLocaleDateString('ru', {
        month: 'long',
        day: 'numeric',
      });
      
      expect(headingText).toContain(dateString);
    });

    test('should display correct date for tomorrow', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const heading = page.getByRole('heading', { level: 1 });
      const headingText = await heading.textContent();
      
      // Получаем дату завтра
      const tomorrow = new Date(Date.now() + 24 * 3600 * 1000);
      const dateString = tomorrow.toLocaleDateString('ru', {
        month: 'long',
        day: 'numeric',
      });
      
      expect(headingText).toContain(dateString);
    });

    test('should display correct date for day after tomorrow', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=2');
      
      const heading = page.getByRole('heading', { level: 1 });
      const headingText = await heading.textContent();
      
      // Получаем дату послезавтра
      const dayAfter = new Date(Date.now() + 2 * 24 * 3600 * 1000);
      const dateString = dayAfter.toLocaleDateString('ru', {
        month: 'long',
        day: 'numeric',
      });
      
      expect(headingText).toContain(dateString);
    });
  });

  test.describe('Suspense and Loading States', () => {
    // test('should show loading fallback while data is loading', async ({ browser }) => {
    //   // Создаем новый контекст для очистки кеша
    //   const context = await browser.newContext({
    //     storageState: undefined,
    //   });
    //   const page = await context.newPage();
      
    //   // Эмулируем медленную загрузку с достаточной задержкой
    //   await page.route('**/api/weather/**', async (route) => {
    //     await new Promise(resolve => setTimeout(resolve, 1500));
    //     await route.continue();
    //   });
      
    //   await page.goto('/forecastWeatherApi');
      
    //   // Проверяем fallback
    //   await expect(page.getByTestId('loading-fallback')).toBeVisible({ timeout: 5000 });
      
    //   // Ждем загрузки данных
    //   await expect(page.locator('th:has-text("Max:")')).toBeVisible({ timeout: 10000 });
      
    //   await context.close();
    // })

    // test('should update loading state when switching days', async ({ page }) => {
    //   await page.goto('/forecastWeatherApi?i_day=0');
      
    //   // Ждем загрузки данных
    //   await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      
    //   // Переключаемся на завтра
    //   await page.getByRole('link', { name: 'Завтра', exact: true }).click();
      
    //   // Проверяем, что показывается fallback
    //   await expect(page.getByText('Загрузка прогноза...')).toBeVisible();
      
    //   // Ждем загрузки новых данных
    //   await expect(page.locator('th:has-text("Max:")')).toBeVisible();
    // });

    test('should use Suspense key to reset state on day change', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=0');
      
      // Получаем данные для сегодня
      const todayMax = await page.locator('th:has-text("Max:")').textContent();
      
      // Переключаемся на завтра
      await page.getByRole('link', { name: 'Завтра', exact: true }).click();
      
      // Ждем загрузки и проверяем, что данные обновились
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      const tomorrowMax = await page.locator('th:has-text("Max:")').textContent();
      expect(tomorrowMax).not.toBe(todayMax);
    });
  });

  test.describe('Data Fetching and Display', () => {
    test('should display forecast data using useWeatherForecast hook', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Проверяем, что данные отображаются
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      await expect(page.locator('th:has-text("Min:")')).toBeVisible();
      await expect(page.locator('th:has-text("Осадки:")')).toBeVisible();
      await expect(page.locator('th:has-text("Скорость ветра:")')).toBeVisible();
      
      // Проверяем почасовой прогноз
      await expect(page.getByRole('heading', { name: 'Почасовой прогноз' })).toBeVisible();
      await expect(page.locator('th:has-text("Погода")')).toBeVisible();
      await expect(page.locator('th:has-text("Температура")')).toBeVisible();
    });

    test('should update data when iDay changes', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=0');
      
      const initialMax = await page.locator('th:has-text("Max:")').textContent();
      const initialMin = await page.locator('th:has-text("Min:")').textContent();
      
      // Переключаемся на завтра
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const newMax = await page.locator('th:has-text("Max:")').textContent();
      const newMin = await page.locator('th:has-text("Min:")').textContent();
      
      // Данные должны измениться
      expect(newMax).not.toBe(initialMax);
      expect(newMin).not.toBe(initialMin);
    });

    test('should display forecast for 3 days', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Проверяем наличие ссылок на 3 дня
      const todayLink = page.getByRole('link', { name: 'Сегодня', exact: true });
      const tomorrowLink = page.getByRole('link', { name: 'Завтра', exact: true });
      const dayAfterLink = page.getByRole('link', { name: 'Послезавтра', exact: true });
      
      await expect(todayLink).toBeVisible();
      await expect(tomorrowLink).toBeVisible();
      await expect(dayAfterLink).toBeVisible();
      
      // Проверяем, что все дни загружаются
      for (let i = 0; i <= 2; i++) {
        await page.goto(`/forecastWeatherApi?i_day=${i}`);
        await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      }
    });
  });

  test.describe('Layout and Styling', () => {
    test('should have correct layout with full width', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      const container = page.locator('.w-full.p-4');
      await expect(container).toBeVisible();
      
      // Проверяем наличие класса w-full вместо CSS свойства
      await expect(container).toHaveClass(/w-full/);
      await expect(container).toHaveClass(/p-4/);
    })

    test('should have flex layout for header', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      const header = page.locator('.flex.w-full.items-center.justify-between');
      await expect(header).toBeVisible();
      await expect(header).toHaveClass(/flex/);
      await expect(header).toHaveClass(/items-center/);
      await expect(header).toHaveClass(/justify-between/);
    });

    test('should display heading with correct styling', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
      await expect(heading).toHaveClass(/text-2xl/);
      await expect(heading).toHaveClass(/font-bold/);
    });

    test('should display footer with copyright', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      const footer = page.locator('.footer-bottom');
      await expect(footer).toBeVisible();
      await expect(footer).toHaveClass(/text-center/);
      await expect(footer).toHaveClass(/pb-5/);
      await expect(footer).toHaveClass(/mt-8/);
      
      const copyright = footer.locator('.copyright');
      await expect(copyright).toBeVisible();
      await expect(copyright).toContainText('Copyright ©');
      
      const link = copyright.locator('a[href="https://www.weatherapi.com"]');
      await expect(link).toBeVisible();
      await expect(link).toHaveText('Weather API');
    });
  });

  test.describe('Navigation and Routing', () => {
    test('should navigate between days using ForecastLinks', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Получаем текущий заголовок
      const initialHeading = await page.getByRole('heading', { level: 1 }).textContent();
      
      // Кликаем на "Завтра"
      await page.getByRole('link', { name: 'Завтра', exact: true }).click();
      
      // Проверяем, что URL обновился
      await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=1/);
      
      // Проверяем, что заголовок обновился
      const newHeading = await page.getByRole('heading', { level: 1 }).textContent();
      expect(newHeading).not.toBe(initialHeading);
      
      // Кликаем на "Сегодня"
      await page.getByRole('link', { name: 'Сегодня', exact: true }).click();
      await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=0/);
    });

    test('should use search parameter from URL', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=2');
      
      // Проверяем, что заголовок соответствует послезавтра
      const heading = page.getByRole('heading', { level: 1 });
      const headingText = await heading.textContent();
      
      const dayAfter = new Date(Date.now() + 2 * 24 * 3600 * 1000);
      const dateString = dayAfter.toLocaleDateString('ru', {
        month: 'long',
        day: 'numeric',
      });
      
      expect(headingText).toContain(dateString);
    });

    test('should handle missing i_day parameter (default to 0)', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Проверяем, что используется i_day=0 по умолчанию
      const heading = page.getByRole('heading', { level: 1 });
      const headingText = await heading.textContent();
      
      const today = new Date();
      const dateString = today.toLocaleDateString('ru', {
        month: 'long',
        day: 'numeric',
      });
      
      expect(headingText).toContain(dateString);
    });
  });

  test.describe('Error Handling', () => {
    test('should handle missing forecast data gracefully', async ({ page }) => {
      // Мокаем пустой ответ
      await page.route('**/api/weather/**', async (route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({})
        });
      });
      
      await page.goto('/forecastWeatherApi');
      
      // Проверяем, что страница не падает
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
      
      // Проверяем, что компонент пытается отобразить данные (даже если их нет)
      await expect(page.locator('.footer-bottom')).toBeVisible();
    });

    test('should handle network error gracefully', async ({ page }) => {
      // Мокаем ошибку сети
      await page.route('**/api/weather/**', async (route) => {
        await route.abort('failed');
      });
      
      await page.goto('/forecastWeatherApi');
      
      // Проверяем, что страница не падает
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Сегодня', exact: true })).toBeVisible();
      
      // Проверяем, что футер отображается
      await expect(page.locator('.footer-bottom')).toBeVisible();
    });

    test('should handle server error (500)', async ({ page }) => {
      // Мокаем ошибку сервера
      await page.route('**/api/weather/**', async (route) => {
        await route.fulfill({
          status: 500,
          body: 'Internal Server Error'
        });
      });
      
      await page.goto('/forecastWeatherApi');
      
      // Проверяем, что страница не падает
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('.footer-bottom')).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('should render page within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/forecastWeatherApi');
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(5000);
    });

    test('should handle quick navigation between days', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Быстро переключаемся между днями
      for (let i = 0; i <= 2; i++) {
        await page.getByRole('link', { name: i === 0 ? 'Сегодня' : i === 1 ? 'Завтра' : 'Послезавтра', exact: true }).click();
        await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should be responsive with padding', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      const container = page.locator('.w-full.p-4');
      await expect(container).toBeVisible();
      await expect(container).toHaveCSS('padding', '16px'); // p-4 = 1rem = 16px
    });

    test('should display forecast table in responsive container', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Проверяем, что таблица с почасовым прогнозом имеет overflow-x-auto
      const container = page.locator('.overflow-x-auto');
      await expect(container).toBeVisible();
    });
  });

  test.describe('Integration with Child Components', () => {
    test('should render ForecastLinks component', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      const links = page.locator('.flex.flex-wrap.gap-2.my-4');
      await expect(links).toBeVisible();
      
      const linkElements = links.locator('a');
      await expect(linkElements).toHaveCount(3);
    });

    test('should render ForecastTable component with correct props', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      // Проверяем, что ForecastTable получил правильный iDay
      const table = page.locator('table').first();
      await expect(table).toBeVisible();
      
      // Проверяем, что отображаются данные для завтра
      const heading = page.getByRole('heading', { level: 1 });
      const headingText = await heading.textContent();
      
      const tomorrow = new Date(Date.now() + 24 * 3600 * 1000);
      const dateString = tomorrow.toLocaleDateString('ru', {
        month: 'long',
        day: 'numeric',
      });
      
      expect(headingText).toContain(dateString);
    });

    test('should pass forecastData from useWeatherForecast to ForecastTable', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Проверяем, что данные отображаются в таблице
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      await expect(page.locator('th:has-text("Min:")')).toBeVisible();
      
      // Проверяем, что данные для почасового прогноза отображаются
      await expect(page.getByRole('heading', { name: 'Почасовой прогноз' })).toBeVisible();
    });
  });
});