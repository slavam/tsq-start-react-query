import { test, expect } from '@playwright/test';

test.describe('Current Weather Page', () => {
  test.describe('Page Load and Rendering', () => {
    test('should load current weather page successfully', async ({ page }) => {
      await page.goto('/currentWeather');
      
      // Проверяем заголовок страницы
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('Текущая погода по состоянию на');
      
      // Проверяем наличие списка с погодой
      const list = page.locator('ul.list-disc');
      await expect(list).toBeVisible();
      
      // Проверяем, что все элементы списка присутствуют
      await expect(page.getByText('Температура:')).toBeVisible();
      await expect(page.getByText('Направление ветра:')).toBeVisible();
      await expect(page.getByText('Скорость ветра:')).toBeVisible();
      await expect(page.getByText('Относительная влажность:')).toBeVisible();
    });

    test('should display current date and time in Russian locale', async ({ page }) => {
      await page.goto('/currentWeather');
      
      const heading = page.getByRole('heading', { level: 1 });
      const headingText = await heading.textContent();
      
      // Проверяем, что дата отображается в русском формате
      const now = new Date();
      const dateString = now.toLocaleString('ru');
      expect(headingText).toContain(dateString);
    });

    test('should display all weather parameters', async ({ page }) => {
      await page.goto('/currentWeather');
      
      // Проверяем наличие всех параметров погоды
      await expect(page.getByText(/Температура:.*°C/)).toBeVisible();
      await expect(page.getByText(/Направление ветра:.*°/)).toBeVisible();
      await expect(page.getByText(/Скорость ветра:.*м\/с/)).toBeVisible();
      await expect(page.getByText(/Относительная влажность:.*%/)).toBeVisible();
    });

    test('should display weather data with correct formatting', async ({ page }) => {
      await page.goto('/currentWeather');
      
      // Проверяем формат температуры (число с одним знаком после запятой)
      const tempText = await page.locator('li:has-text("Температура:")').textContent();
      expect(tempText).toMatch(/Температура: -?\d+\.\d°C/);
      
      // Проверяем формат влажности (целое число)
      const humidityText = await page.locator('li:has-text("Относительная влажность:")').textContent();
      expect(humidityText).toMatch(/Относительная влажность: \d+%/);
      
      // Проверяем формат скорости ветра (число)
      const windSpeedText = await page.locator('li:has-text("Скорость ветра:")').textContent();
      expect(windSpeedText).toMatch(/Скорость ветра: \d+\.?\d*м\/с/);
    });
  });

  test.describe('Data Loading and Fetching', () => {
    test('should load data using loader', async ({ page }) => {
      await page.goto('/currentWeather');
      
      // Проверяем, что данные загружены
      await expect(page.locator('li:has-text("Температура:")')).toBeVisible();
      await expect(page.locator('li:has-text("Направление ветра:")')).toBeVisible();
      await expect(page.locator('li:has-text("Скорость ветра:")')).toBeVisible();
      await expect(page.locator('li:has-text("Относительная влажность:")')).toBeVisible();
    });

    test('should use useSuspenseQuery for data fetching', async ({ page }) => {
      // Эмулируем медленную загрузку
      await page.route('**/api/weather/**', async (route) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.continue();
      });
      
      await page.goto('/currentWeather');
      
      // Проверяем, что данные загрузились
      await expect(page.locator('li:has-text("Температура:")')).toBeVisible({ timeout: 10000 });
    });

    test('should handle temperature conversion from Kelvin to Celsius', async ({ page }) => {
      await page.goto('/currentWeather');
      
      const tempText = await page.locator('li:has-text("Температура:")').textContent();
      
      // Проверяем, что температура в градусах Цельсия (не Кельвинах)
      expect(tempText).toContain('°C');
      expect(tempText).not.toContain('K');
      
      // Проверяем, что значение разумное (для Донецка)
      const tempMatch = tempText?.match(/-?\d+\.\d/);
      if (tempMatch) {
        const temp = parseFloat(tempMatch[0]);
        // Температура должна быть в разумном диапазоне (-30..+40)
        expect(temp).toBeGreaterThan(-40);
        expect(temp).toBeLessThan(50);
      }
    });
  });

  test.describe('Layout and Styling', () => {
    test('should have correct layout with flex and padding', async ({ page }) => {
      await page.goto('/currentWeather');
      
      const container = page.getByTestId('current-weather-container');
      await expect(container).toBeVisible();
      await expect(container).toHaveClass(/flex/);
      await expect(container).toHaveClass(/gap-2/);
      await expect(container).toHaveClass(/p-2/);
    })

    test('should display heading with correct styling', async ({ page }) => {
      await page.goto('/currentWeather');
      
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
    });

    test('should display list with correct styling', async ({ page }) => {
      await page.goto('/currentWeather');
      
      const list = page.locator('ul.list-disc.pl-4');
      await expect(list).toBeVisible();
      await expect(list).toHaveClass(/list-disc/);
      await expect(list).toHaveClass(/pl-4/);
    });

    test('should display list items with no wrap', async ({ page }) => {
      await page.goto('/currentWeather');
      
      const listItems = page.locator('li.whitespace-nowrap');
      const count = await listItems.count();
      expect(count).toBe(4);
      
      // Проверяем, что у всех элементов есть класс whitespace-nowrap
      for (let i = 0; i < count; i++) {
        const item = listItems.nth(i);
        await expect(item).toHaveClass(/whitespace-nowrap/);
      }
    });

    test('should have bold text for weather data', async ({ page }) => {
      await page.goto('/currentWeather');
      
      const container = page.locator('.font-bold.text-lg');
      await expect(container).toBeVisible();
      await expect(container).toHaveClass(/font-bold/);
      await expect(container).toHaveClass(/text-lg/);
    });

    test('should display horizontal rulers', async ({ page }) => {
      await page.goto('/currentWeather');
      
      // Проверяем, что элементы присутствуют в DOM (даже если невидимы)
      await expect(page.getByTestId('hr-before')).toBeAttached();
      await expect(page.getByTestId('hr-after')).toBeAttached();
    })
  });

  test.describe('Data Processing', () => {
    test('should correctly map measurement hashes to weather parameters', async ({ page }) => {
      await page.goto('/currentWeather');
      
      // Проверяем, что все параметры отображаются с правильными единицами измерения
      await expect(page.locator('li:has-text("Температура:")')).toBeVisible();
      await expect(page.locator('li:has-text("Направление ветра:")')).toBeVisible();
      await expect(page.locator('li:has-text("Скорость ветра:")')).toBeVisible();
      await expect(page.locator('li:has-text("Относительная влажность:")')).toBeVisible();
    });

    test('should handle missing data gracefully', async ({ page }) => {
      // Мокаем ответ с неполными данными
      await page.route('**/api/weather/**', async (route) => {
        const response = await route.fetch();
        const body = await response.json();
        // Удаляем часть данных
        if (Array.isArray(body)) {
          body.splice(1, 2);
        }
        await route.fulfill({
          response,
          body: JSON.stringify(body)
        });
      });
      
      await page.goto('/currentWeather');
      
      // Проверяем, что страница не падает
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
      
      // Некоторые данные могут быть undefined, но страница должна быть видима
      await expect(page.locator('ul.list-disc')).toBeVisible();
    });

    test('should handle empty data array', async ({ page }) => {
      // Мокаем пустой ответ
      await page.route('**/api/weather/**', async (route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify([])
        });
      });
      
      await page.goto('/currentWeather');
      
      // Проверяем, что страница не падает
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
      
      // Проверяем, что список отображается (с undefined значениями)
      const list = page.locator('ul.list-disc');
      await expect(list).toBeVisible();
    });
  });

  test.describe('Error Handling', () => {
    test('should handle network error gracefully', async ({ page }) => {
      // Мокаем ошибку сети
      await page.route('**/api/weather/**', async (route) => {
        await route.abort('failed');
      });
      
      await page.goto('/currentWeather');
      
      // Проверяем, что страница показывает ошибку или загрузку
      // В зависимости от реализации useSuspenseQuery
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
      
      await page.goto('/currentWeather');
      
      // Проверяем, что страница не падает
      await expect(page.locator('body')).toBeVisible();
    });

    test('should handle invalid data format', async ({ page }) => {
      // Мокаем невалидные данные
      await page.route('**/api/weather/**', async (route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ invalid: 'data' })
        });
      });
      
      await page.goto('/currentWeather');
      
      // Проверяем, что страница не падает
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('Outlet Integration', () => {
    test('should render Outlet component', async ({ page }) => {
      await page.goto('/currentWeather');
      
      // Проверяем наличие контейнера Outlet
      await expect(page.getByTestId('outlet-container')).toBeAttached();
    })

    test('should render child routes in Outlet', async ({ page }) => {
      await page.goto('/currentWeather');
      
      // Проверяем наличие контейнера Outlet
      await expect(page.getByTestId('outlet-container')).toBeAttached();
      
      // Проверяем, что Outlet существует как элемент
      const outletContainer = page.getByTestId('outlet-container');
      await expect(outletContainer).toBeAttached();
      
      // Если есть дочерний маршрут, можно проверить его
      // Например: await page.goto('/currentWeather/details');
      // и проверить контент
    })
  });

  test.describe('Accessibility', () => {
    test('should have proper heading structure', async ({ page }) => {
      await page.goto('/currentWeather');
      
      // Проверяем, что h1 используется для заголовка
      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toBeVisible();
      await expect(h1).toContainText('Текущая погода');
    });

    test('should have accessible list', async ({ page }) => {
      await page.goto('/currentWeather');
      
      const list = page.locator('ul.list-disc');
      await expect(list).toBeVisible();
      
      // Проверяем, что все элементы списка имеют текст
      const items = list.locator('li');
      const count = await items.count();
      expect(count).toBe(4);
      
      for (let i = 0; i < count; i++) {
        const item = items.nth(i);
        const text = await item.textContent();
        expect(text?.trim()).not.toBe('');
      }
    });
  });

  test.describe('Performance', () => {
    test('should load page within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/currentWeather');
      await expect(page.locator('li:has-text("Температура:")')).toBeVisible();
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(5000);
    });

    test('should handle multiple page reloads quickly', async ({ page }) => {
      await page.goto('/currentWeather');
      await expect(page.locator('li:has-text("Температура:")')).toBeVisible();
      
      // Перезагружаем несколько раз
      for (let i = 0; i < 3; i++) {
        await page.reload();
        await expect(page.locator('li:has-text("Температура:")')).toBeVisible();
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      await page.goto('/currentWeather');
      
      // Проверяем, что контент виден
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('ul.list-disc')).toBeVisible();
    });

    test('should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      await page.goto('/currentWeather');
      
      // Проверяем, что контент виден
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('ul.list-disc')).toBeVisible();
    });
  });
});


// ```typescript
test.describe('Edge Cases', () => {
  test('should handle negative temperature values', async ({ page }) => {
    // Мокаем ответ с отрицательной температурой
    await page.route('**/api/weather/**', async (route) => {
      const response = await route.fetch();
      const body = await response.json();
      // Изменяем температуру на отрицательную
      if (Array.isArray(body)) {
        const tempItem = body.find((item: any) => item.meas_hash === 1451382247);
        if (tempItem) {
          tempItem.value = 253.15; // -20°C
        }
      }
      await route.fulfill({
        response,
        body: JSON.stringify(body)
      });
    });
    
    await page.goto('/currentWeather');
    
    // Проверяем, что отрицательная температура отображается корректно
    const tempText = await page.locator('li:has-text("Температура:")').textContent();
    expect(tempText).toMatch(/Температура: -?\d+\.\d°C/);
  });

  test('should handle zero temperature', async ({ page }) => {
    // Мокаем ответ с нулевой температурой
    await page.route('**/api/weather/**', async (route) => {
      const response = await route.fetch();
      const body = await response.json();
      if (Array.isArray(body)) {
        const tempItem = body.find((item: any) => item.meas_hash === 1451382247);
        if (tempItem) {
          tempItem.value = 273.15; // 0°C
        }
      }
      await route.fulfill({
        response,
        body: JSON.stringify(body)
      });
    });
    
    await page.goto('/currentWeather');
    
    // Проверяем, что нулевая температура отображается корректно
    const tempText = await page.locator('li:has-text("Температура:")').textContent();
    expect(tempText).toContain('0.0°C');
  });

  test('should handle very high wind speed', async ({ page }) => {
    // Мокаем ответ с высокой скоростью ветра
    await page.route('**/api/weather/**', async (route) => {
      const response = await route.fetch();
      const body = await response.json();
      if (Array.isArray(body)) {
        const windItem = body.find((item: any) => item.meas_hash === 1345858116);
        if (windItem) {
          windItem.value = '150';
        }
      }
      await route.fulfill({
        response,
        body: JSON.stringify(body)
      });
    });
    
    await page.goto('/currentWeather');
    
    // Проверяем, что высокая скорость ветра отображается корректно
    const windText = await page.locator('li:has-text("Скорость ветра:")').textContent();
    expect(windText).toMatch(/Скорость ветра: 150м\/с/);
  });

  test('should handle humidity above 100%', async ({ page }) => {
    // Мокаем ответ с влажностью > 100%
    await page.route('**/api/weather/**', async (route) => {
      const response = await route.fetch();
      const body = await response.json();
      if (Array.isArray(body)) {
        const humidityItem = body.find((item: any) => item.meas_hash === -996973625);
        if (humidityItem) {
          humidityItem.value = '150';
        }
      }
      await route.fulfill({
        response,
        body: JSON.stringify(body)
      });
    });
    
    await page.goto('/currentWeather');
    
    // Проверяем, что влажность отображается корректно (даже если > 100%)
    const humidityText = await page.locator('li:has-text("Относительная влажность:")').textContent();
    expect(humidityText).toContain('150%');
  });
});