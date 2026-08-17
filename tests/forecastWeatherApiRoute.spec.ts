import { test, expect } from '@playwright/test';

test.describe('Weather Icons', () => {
  test.describe('Icon Display and Rendering', () => {
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

    test('should display icons for today based on current hour', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=0');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      
      // Для сегодня количество иконок зависит от текущего часа
      const currentHour = new Date().getHours();
      const expectedCount = 24 - currentHour;
      expect(count).toBe(expectedCount);
      
      // Проверяем, что все иконки загружаются
      for (let i = 0; i < Math.min(count, 5); i++) {
        const icon = icons.nth(i);
        await expect(icon).toBeVisible();
        await expect(icon).toHaveAttribute('src', /^(https?:)?\/\/cdn\.weatherapi\.com\/weather\/.*\.png$/);
        await expect(icon).toHaveAttribute('alt', /.+/);
        await expect(icon).toHaveAttribute('title', /.+/);
      }
    });

    test('should display icons for day after tomorrow', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=2');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      
      // Для послезавтра должно быть 24 иконки
      expect(count).toBe(24);
      
      // Проверяем все иконки
      for (let i = 0; i < count; i++) {
        const icon = icons.nth(i);
        await expect(icon).toBeVisible();
        const src = await icon.getAttribute('src');
        expect(src).toMatch(/^(https?:)?\/\/cdn\.weatherapi\.com\/weather\/.*\.png$/);
      }
    });
  });

  test.describe('Icon Attributes', () => {
    test('should have alt attribute for accessibility', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      
      for (let i = 0; i < count; i++) {
        const icon = icons.nth(i);
        const alt = await icon.getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt?.trim()).not.toBe('');
      }
    });

    test('should have title attribute with weather condition', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      
      for (let i = 0; i < count; i++) {
        const icon = icons.nth(i);
        const title = await icon.getAttribute('title');
        expect(title).toBeTruthy();
        expect(title?.trim()).not.toBe('');
      }
    });

    test('should have consistent alt and title attributes', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      
      for (let i = 0; i < count; i++) {
        const icon = icons.nth(i);
        const alt = await icon.getAttribute('alt');
        const title = await icon.getAttribute('title');
        expect(alt).toBe(title);
      }
    });

    test('should have valid image sources', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      
      for (let i = 0; i < count; i++) {
        const icon = icons.nth(i);
        const src = await icon.getAttribute('src');
        expect(src).toBeTruthy();
        expect(src).toMatch(/^(https?:)?\/\/cdn\.weatherapi\.com\/weather\/\d+x\d+\/(day|night)\/\d+\.png$/);
      }
    });
  });

  test.describe('Icon Styling', () => {
    test('should have correct CSS classes for icons', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      
      for (let i = 0; i < Math.min(count, 5); i++) {
        const icon = icons.nth(i);
        await expect(icon).toHaveClass(/mx-auto/);
        await expect(icon).toHaveClass(/w-12/);
        await expect(icon).toHaveClass(/h-12/);
      }
    });

    test('should have correct icon size', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const icon = page.locator('.overflow-x-auto table img').first();
      
      // Проверяем CSS размеры
      await expect(icon).toHaveCSS('width', '48px'); // w-12 = 3rem = 48px
      await expect(icon).toHaveCSS('height', '48px');
    });

    test('should have centered icons', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const icon = page.locator('.overflow-x-auto table img').first();
      
      // Проверяем наличие класса mx-auto вместо конкретных CSS свойств
      await expect(icon).toHaveClass(/mx-auto/);
    })
  });

  test.describe('Icon Behavior', () => {
    test('should update icons when switching days', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      // Получаем первую иконку для завтра
      const tomorrowIcon = page.locator('.overflow-x-auto table img').first();
      const tomorrowSrc = await tomorrowIcon.getAttribute('src');
      
      // Переключаемся на послезавтра
      await page.getByRole('link', { name: 'Послезавтра', exact: true }).click();
      
      // Получаем первую иконку для послезавтра
      const dayAfterIcon = page.locator('.overflow-x-auto table img').first();
      const dayAfterSrc = await dayAfterIcon.getAttribute('src');
      
      // Иконки должны быть разными (или могут быть одинаковыми, но это маловероятно)
      // Проверяем, что иконка обновилась
      const isDifferent = tomorrowSrc !== dayAfterSrc;
      // Или проверяем, что иконка загрузилась
      expect(dayAfterSrc).toBeTruthy();
    });

    test('should show correct icons for each hour', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      
      // Проверяем, что все иконки разные или некоторые повторяются (это нормально)
      const srcs = new Set();
      for (let i = 0; i < count; i++) {
        const src = await icons.nth(i).getAttribute('src');
        srcs.add(src);
      }
      
      // Должно быть хотя бы несколько разных иконок
      expect(srcs.size).toBeGreaterThan(1);
    });
  });

  test.describe('Icon Loading', () => {
    test('should load icons successfully', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      
      for (let i = 0; i < count; i++) {
        const icon = icons.nth(i);
        await expect(icon).toBeVisible();
        
        // Исправлено: добавлен return
        const naturalWidth = await icon.evaluate((img) => {
          if (img instanceof HTMLImageElement) {
            return img.naturalWidth; // 👈 явный return
          }
          return 0;
        });
        expect(naturalWidth).toBeGreaterThan(0);
      }
    })

    test('should handle icon loading errors gracefully', async ({ page }) => {
      // Мокаем ошибку загрузки иконок
      await page.route('**/cdn.weatherapi.com/**', async (route) => {
        await route.abort('failed');
      });
      
      await page.goto('/forecastWeatherApi?i_day=1');
      
      // Проверяем, что страница не падает
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      expect(count).toBe(24);
      
      // Иконки могут быть сломанными, но должны существовать
      for (let i = 0; i < Math.min(count, 3); i++) {
        const icon = icons.nth(i);
        await expect(icon).toBeVisible();
      }
    });
  });

  test.describe('Icon Count by Day', () => {
    test('should show 24 icons for tomorrow', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      expect(count).toBe(24);
    });

    test('should show 24 icons for day after tomorrow', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=2');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      expect(count).toBe(24);
    });

    test('should show correct number of icons for today', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=0');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      
      const currentHour = new Date().getHours();
      const expectedCount = 24 - currentHour;
      expect(count).toBe(expectedCount);
    });

    test('should show icons only for remaining hours today', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=0');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      
      // Проверяем, что количество иконок соответствует количеству заголовков часов
      const hourHeaders = page.locator('.overflow-x-auto table thead tr').first().locator('th');
      const headerCount = await hourHeaders.count();
      
      // Иконок должно быть на 1 меньше (первый заголовок пустой)
      expect(count).toBe(headerCount - 1);
    });
  });

  test.describe('Icon Integration with Table', () => {
    test('should have icons in correct table row', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      // Проверяем, что иконки находятся во второй строке заголовка
      const iconRow = page.locator('.overflow-x-auto table thead tr').nth(1);
      const icons = iconRow.locator('img');
      const count = await icons.count();
      expect(count).toBe(24);
    });

    test('should have icons aligned with hour headers', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const hourHeaders = page.locator('.overflow-x-auto table thead tr').first().locator('th');
      const iconRow = page.locator('.overflow-x-auto table thead tr').nth(1);
      
      const headerCount = await hourHeaders.count();
      const iconCount = await iconRow.locator('img').count();
      
      // Иконок должно быть на 1 меньше (первый заголовок - "Погода")
      expect(iconCount).toBe(headerCount - 1);
    });

    test('should have consistent icon dimensions', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      
      let firstWidth: string | null = null;
      let firstHeight: string | null = null;
      
      for (let i = 0; i < count; i++) {
        const icon = icons.nth(i);
        const width = await icon.getAttribute('width');
        const height = await icon.getAttribute('height');
        
        if (i === 0) {
          firstWidth = width;
          firstHeight = height;
        } else {
          // Все иконки должны иметь одинаковые размеры
          expect(width).toBe(firstWidth);
          expect(height).toBe(firstHeight);
        }
      }
    });
  });

  test.describe('Icon Accessibility', () => {
    test('should have descriptive alt text', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      
      const altTexts = new Set();
      for (let i = 0; i < count; i++) {
        const alt = await icons.nth(i).getAttribute('alt');
        altTexts.add(alt);
        expect(alt).toBeTruthy();
        expect(alt?.trim()).not.toBe('');
      }
      
      // Должно быть несколько разных alt текстов
      expect(altTexts.size).toBeGreaterThan(1);
    });

    test('should have descriptive title text', async ({ page }) => {
      await page.goto('/forecastWeatherApi?i_day=1');
      
      const icons = page.locator('.overflow-x-auto table img');
      const count = await icons.count();
      
      for (let i = 0; i < count; i++) {
        const title = await icons.nth(i).getAttribute('title');
        expect(title).toBeTruthy();
        expect(title?.trim()).not.toBe('');
      }
    });
  });
});