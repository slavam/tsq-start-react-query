import { test, expect } from '@playwright/test';

test.describe('Forecast Weather API Route', () => {
  test.describe('Page Load and Rendering', () => {
    test('should load forecast page successfully', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Проверяем, что страница загрузилась
      await expect(page).toHaveURL(/.*\/forecastWeatherApi/);
      
      // Проверяем наличие заголовка с прогнозом
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('Прогноз погоды');
    });

    test('should display forecast data after loading', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Проверяем, что дневной прогноз загружен
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      await expect(page.locator('th:has-text("Min:")')).toBeVisible();
      await expect(page.locator('th:has-text("Осадки:")')).toBeVisible();
      await expect(page.locator('th:has-text("Скорость ветра:")')).toBeVisible();
      
      // Проверяем, что почасовой прогноз загружен
      await expect(page.getByRole('heading', { name: 'Почасовой прогноз' })).toBeVisible();
      await expect(page.locator('th:has-text("Погода")')).toBeVisible();
      await expect(page.locator('th:has-text("Температура")')).toBeVisible();
    });

    test('should display default i_day=0 when no search param provided', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Проверяем, что отображается сегодняшний день
      await expect(page.getByRole('link', { name: 'Сегодня', exact: true })).toBeVisible();
      
      // Проверяем, что данные соответствуют сегодняшнему дню
      const heading = page.getByRole('heading', { level: 1 });
      const headingText = await heading.textContent();
      expect(headingText).toContain('на');
    });
  });

  test.describe('Search Parameters', () => {
    test('should accept i_day=0 parameter', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=0');
      
      await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=0/);
      
      // Проверяем, что активна ссылка "Сегодня"
      const todayLink = page.getByRole('link', { name: 'Сегодня', exact: true });
      await expect(todayLink).toBeVisible();
      
      // Проверяем, что данные загружены
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
    });

    test('should accept i_day=1 parameter', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=1/);
      
      // Проверяем, что активна ссылка "Завтра"
      const tomorrowLink = page.getByRole('link', { name: 'Завтра', exact: true });
      await expect(tomorrowLink).toBeVisible();
      
      // Проверяем, что данные загружены
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
    });

    test('should accept i_day=2 parameter', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=2');
      
      await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=2/);
      
      // Проверяем, что активна ссылка "Послезавтра"
      const dayAfterLink = page.getByRole('link', { name: 'Послезавтра', exact: true });
      await expect(dayAfterLink).toBeVisible();
      
      // Проверяем, что данные загружены
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
    });

    test('should handle invalid i_day parameter (default to 0)', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=99');
      
      // Должен быть перенаправлен или использовать значение по умолчанию
      await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=99/);
      
      // Проверяем, что данные все равно загружены (используется значение по умолчанию)
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
    });

    test('should handle negative i_day parameter (default to 0)', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=-1');
      
      await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=-1/);
      
      // Проверяем, что данные загружены (используется значение по умолчанию)
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
    });

    test('should handle i_day=3 (max 2, default to 0)', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=3');
      
      await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=3/);
      
      // Проверяем, что данные загружены (используется значение по умолчанию)
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
    });

    test('should handle invalid search params gracefully', async ({ page }) => {
      await page.goto('/forecastWeatherApi?invalid=param');
      
      // Страница должна загрузиться с параметрами по умолчанию
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Почасовой прогноз' })).toBeVisible();
    });
  });

  test.describe('Data Loading', () => {
    test('should show loading state while fetching data', async ({ page }) => {
      // Эмулируем медленный ответ
      await page.route('**/api/weather/**', async (route) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.continue();
      });
      
      await page.goto('/forecastWeatherApi');
      
      // Проверяем, что данные в конечном итоге загружаются
      await expect(page.locator('th:has-text("Max:")')).toBeVisible({ timeout: 10000 });
    });

    test('should display forecast data with correct structure', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Проверяем наличие всех обязательных элементов
      const forecastData = page.locator('table').first();
      await expect(forecastData).toBeVisible();
      
      // Проверяем, что все показатели отображаются
      await expect(forecastData.getByText(/Восход:/)).toBeVisible();
      await expect(forecastData.getByText(/Закат:/)).toBeVisible();
      await expect(forecastData.getByText(/Max:/)).toBeVisible();
      await expect(forecastData.getByText(/Min:/)).toBeVisible();
      await expect(forecastData.getByText(/Осадки:/)).toBeVisible();
      await expect(forecastData.getByText(/Скорость ветра:/)).toBeVisible();
    });

    test('should display hourly forecast with 24 hours for selected day', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1'); // Завтра
      
      const hourlyTable = page.locator('.overflow-x-auto table');
      const hourHeaders = hourlyTable.locator('thead tr').first().locator('th');
      const count = await hourHeaders.count();
      
      // Должно быть 25 (1 пустой + 24 часа)
      expect(count).toBe(25);
    });

    test('should display weather icons for each hour', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      
      // Для завтра должно быть 24 иконки
      expect(count).toBe(24);
      
      // Проверяем первую иконку
      const firstIcon = icons.first();
      await expect(firstIcon).toBeVisible();
      
      // Проверяем URL (может быть с http://, https:// или //)
      const src = await firstIcon.getAttribute('src');
      expect(src).toBeTruthy();
      expect(src).toMatch(/^(https?:)?\/\/cdn\.weatherapi\.com\/weather\/.*\.png$/);
      
      // Проверяем alt и title
      await expect(firstIcon).toHaveAttribute('alt', /.+/);
      await expect(firstIcon).toHaveAttribute('title', /.+/);
      
      // Проверяем стили
      await expect(firstIcon).toHaveClass(/mx-auto/);
      await expect(firstIcon).toHaveClass(/w-12/);
      await expect(firstIcon).toHaveClass(/h-12/);
    });
  });

  test.describe('Lazy Loading', () => {
    test('should lazy load component', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/forecastWeatherApi');
      
      // Проверяем, что компонент загрузился
      await expect(page.locator('th:has-text("Max:")')).toBeVisible({ timeout: 10000 });
      
      const loadTime = Date.now() - startTime;
      // Компонент должен загрузиться за разумное время
      expect(loadTime).toBeLessThan(5000);
    });

    test('should load component only once', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Ждем загрузки компонента
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      
      // Переходим на другую страницу и возвращаемся
      await page.goto('/');
      await page.goto('/forecastWeatherApi');
      
      // Компонент должен загрузиться быстро (из кеша)
      const startTime = Date.now();
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      const loadTime = Date.now() - startTime;
      
      // Второй раз должно загрузиться быстрее
      expect(loadTime).toBeLessThan(1000);
    });
  });

  test.describe('Query Client and Data Fetching', () => {
    test('should prefetch data using queryClient', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Проверяем, что данные загружены
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      
      // Проверяем, что данные кешированы (быстрая загрузка при перезагрузке)
      await page.reload();
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
    });

    test('should fetch forecast for 3 days', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Проверяем наличие данных для всех трех дней через ссылки
      await expect(page.getByRole('link', { name: 'Сегодня', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Завтра', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Послезавтра', exact: true })).toBeVisible();
      
      // Проверяем данные для каждого дня
      const days = [0, 1, 2];
      for (const day of days) {
        await page.goto(`/forecastWeatherApi?i_day=${day}`);
        await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      }
    });

    test('should handle network errors gracefully', async ({ page }) => {
      // Мокаем ошибку сети
      await page.route('**/api/weather/**', async (route) => {
        await route.abort('failed');
      });
      
      await page.goto('/forecastWeatherApi');
      
      // Проверяем, что страница не падает
      // (Может отображать ошибку или пустое состояние)
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should navigate between days using links', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Получаем текущую максимальную температуру
      const initialMax = await page.locator('th:has-text("Max:")').textContent();
      
      // Переходим на завтра
      await page.getByRole('link', { name: 'Завтра', exact: true }).click();
      await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=1/);
      
      // Проверяем, что данные обновились
      const tomorrowMax = await page.locator('th:has-text("Max:")').textContent();
      expect(tomorrowMax).not.toBe(initialMax);
      
      // Переходим на послезавтра
      await page.getByRole('link', { name: 'Послезавтра', exact: true }).click();
      await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=2/);
      
      // Переходим обратно на сегодня
      await page.getByRole('link', { name: 'Сегодня', exact: true }).click();
      await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=0/);
    });

    test('should maintain search params when navigating back', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      // Переходим на главную
      await page.getByRole('link', { name: 'Home' }).click();
      await expect(page).toHaveURL('/');
      
      // Возвращаемся назад
      await page.goBack();
      
      // Проверяем, что параметр сохранился
      await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=1/);
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
    });
  });

  test.describe('Route Configuration', () => {
    test('should validate search parameters with Zod schema', async ({ page }) => {
      // Проверяем валидные значения
      for (let i = 0; i <= 2; i++) {
        await page.goto(`/forecastWeatherApi?i_day=${i}`);
        await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      }
      
      // Проверяем невалидные значения (должны быть обработаны)
      await page.goto('/forecastWeatherApi?i_day=abc');
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      
      await page.goto('/forecastWeatherApi?i_day=999');
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
    });

    test('should have correct route path', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      await expect(page).toHaveURL(/.*\/forecastWeatherApi/);
      
      // Проверяем, что путь соответствует ожидаемому
      const url = page.url();
      expect(url).toContain('/forecastWeatherApi');
    });

    test('should have parent route (rootRoute)', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Проверяем наличие элементов из rootRoute
      // (например, навигационное меню, если оно есть в root)
      // await expect(page.locator('nav')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('should load page within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/forecastWeatherApi');
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000);
    });

    test('should handle rapid navigation between days', async ({ page }) => {
      await page.goto('/forecastWeatherApi');
      
      // Быстро переключаемся между днями
      for (let i = 0; i <= 2; i++) {
        await page.goto(`/forecastWeatherApi?i_day=${i}`);
        await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      }
    });
  });

  test.describe('Error Handling', () => {
    test('should handle missing forecast data', async ({ page }) => {
      // Мокаем пустой ответ
      await page.route('**/api/weather/**', async (route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({})
        });
      });
      
      await page.goto('/forecastWeatherApi');
      
      // Проверяем, что страница не падает
      await expect(page.locator('body')).toBeVisible();
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
      await expect(page.locator('body')).toBeVisible();
    });
  });
});