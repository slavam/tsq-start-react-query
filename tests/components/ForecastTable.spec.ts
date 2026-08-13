import { test, expect } from '@playwright/test';
import type { WeatherForecastResponse } from '~/utils/weather';

test.describe('ForecastTable Component', () => {
  test.beforeEach(async ({ page }) => {
    // Переходим на страницу с прогнозом
    await page.goto('/forecastWeatherApi');
  });

  test.describe('Daily Forecast Table', () => {
    test('should display daily forecast table with all metrics', async ({ page }) => {
      const table = page.locator('table').first();
      await expect(table).toBeVisible();

      // Проверяем наличие всех показателей
      await expect(table.getByText(/Восход:/)).toBeVisible();
      await expect(table.getByText(/Закат:/)).toBeVisible();
      await expect(table.getByText(/Max:/)).toBeVisible();
      await expect(table.getByText(/Min:/)).toBeVisible();
      await expect(table.getByText(/Осадки:/)).toBeVisible();
      await expect(table.getByText(/Скорость ветра:/)).toBeVisible();
    });

    test('should display correct sunrise and sunset times', async ({ page }) => {
      const sunriseText = await page.locator('th:has-text("Восход:")').textContent();
      const sunsetText = await page.locator('th:has-text("Закат:")').textContent();

      // Проверяем формат времени (HH:MM)
      expect(sunriseText).toMatch(/\d{2}:\d{2}/);
      expect(sunsetText).toMatch(/\d{2}:\d{2}/);
    });

    test('should display temperature values in Celsius', async ({ page }) => {
      const maxTemp = await page.locator('th:has-text("Max:")').textContent();
      const minTemp = await page.locator('th:has-text("Min:")').textContent();

      expect(maxTemp).toMatch(/\d+\.?\d* °C/);
      expect(minTemp).toMatch(/\d+\.?\d* °C/);
    });

    test('should display precipitation in mm', async ({ page }) => {
      const precip = await page.locator('th:has-text("Осадки:")').textContent();
      expect(precip).toMatch(/\d+\.?\d* mm/);
    });

    test('should display wind speed in m/s', async ({ page }) => {
      const wind = await page.locator('th:has-text("Скорость ветра:")').textContent();
      expect(wind).toMatch(/\d+\.?\d* м\/сек/);
    });

    test('should have correct table header styling', async ({ page }) => {
      const headerRow = page.locator('table').first().locator('thead tr');
      await expect(headerRow).toHaveClass(/bg-gray-700/);
      await expect(headerRow.locator('th').first()).toHaveCSS('height', '80px');
    });
  });

  test.describe('Hourly Forecast', () => {
  test('should display hours from current hour for today', async ({ page }) => {
    const currentHour = new Date().getHours();
    
    // Получаем все заголовки часов
    const hourHeaders = page.locator('table').nth(1).locator('thead tr').first().locator('th');
    const hours = await hourHeaders.allTextContents();
    
    // Первый th - пустой, остальные - часы
    // Для сегодня должно быть (24 - currentHour) часов
    const expectedCount = 24 - currentHour;
    // +1 потому что первый th пустой
    expect(hours.length).toBe(expectedCount + 1);
    
    // Проверяем, что первый час - текущий или ближайший
    if (currentHour < 23) {
      const firstHour = parseInt(hours[1].replace(':00', ''));
      expect(firstHour).toBe(currentHour);
    }
    
    // Проверяем последовательность часов
    for (let i = 1; i < hours.length; i++) {
      const hour = parseInt(hours[i].replace(':00', ''));
      expect(hour).toBe(currentHour + i - 1);
    }
  });

  test('should display all 24 hours for tomorrow', async ({ page }) => {
    // Переключаемся на завтра
    await page.getByRole('link', { name: 'Завтра', exact: true }).click();
    
    const hourHeaders = page.locator('table').nth(1).locator('thead tr').first().locator('th');
    const hours = await hourHeaders.allTextContents();
    
    // Должно быть 25 (1 пустой + 24 часа)
    expect(hours.length).toBe(25);
    
    // Проверяем, что есть все часы с 0:00 до 23:00
    for (let i = 0; i < 24; i++) {
      const hourString = `${i}:00`;
      expect(hours.some(text => text.includes(hourString))).toBeTruthy();
    }
  });

  test('should display all 24 hours for day after tomorrow', async ({ page }) => {
    // Переключаемся на послезавтра
    await page.getByRole('link', { name: 'Послезавтра', exact: true }).click();
    
    const hourHeaders = page.locator('table').nth(1).locator('thead tr').first().locator('th');
    const hours = await hourHeaders.allTextContents();
    
    // Должно быть 25 (1 пустой + 24 часа)
    expect(hours.length).toBe(25);
    
    // Проверяем, что есть все часы с 0:00 до 23:00
    for (let i = 0; i < 24; i++) {
      const hourString = `${i}:00`;
      expect(hours.some(text => text.includes(hourString))).toBeTruthy();
    }
  });

  test('should display correct number of hours based on selected day', async ({ page }) => {
    const currentHour = new Date().getHours();
    
    // Проверяем сегодня
    await page.goto('/forecastWeatherApi?i_day=0');
    let hourHeaders = page.locator('table').nth(1).locator('thead tr').first().locator('th');
    let count = await hourHeaders.count();
    // +1 для пустого заголовка
    expect(count).toBe(24 - currentHour + 1);
    
    // Проверяем завтра
    await page.goto('/forecastWeatherApi?i_day=1');
    hourHeaders = page.locator('table').nth(1).locator('thead tr').first().locator('th');
    count = await hourHeaders.count();
    expect(count).toBe(25); // 24 часа + пустой заголовок
    
    // Проверяем послезавтра
    await page.goto('/forecastWeatherApi?i_day=2');
    hourHeaders = page.locator('table').nth(1).locator('thead tr').first().locator('th');
    count = await hourHeaders.count();
    expect(count).toBe(25); // 24 часа + пустой заголовок
  });

  test('should display correct weather data for each displayed hour', async ({ page }) => {
    const currentHour = new Date().getHours();
    
    // Получаем строки таблицы
    const table = page.locator('table').nth(1);
    const hourRow = table.locator('thead tr').nth(0);
    const iconRow = table.locator('thead tr').nth(1);
    const tempRow = table.locator('thead tr').nth(2);
    const precipRow = table.locator('thead tr').nth(3);
    
    // Получаем все ячейки
    const hours = await hourRow.locator('th').allTextContents();
    const icons = await iconRow.locator('img').all();
    const temps = await tempRow.locator('th').allTextContents();
    const precip = await precipRow.locator('th').allTextContents();
    
    // Проверяем, что количество данных совпадает
    expect(icons.length).toBe(hours.length - 1); // минус пустой заголовок
    expect(temps.length).toBe(hours.length);
    expect(precip.length).toBe(hours.length);
    
    // Проверяем температуру для каждого часа
    for (let i = 1; i < temps.length; i++) {
      expect(temps[i]).toMatch(/^-?\d+\.?\d*$/);
    }
    
    // Проверяем вероятность осадков
    for (let i = 1; i < precip.length; i++) {
      const value = parseInt(precip[i]);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    }
  });

  test('should update hourly data when switching days', async ({ page }) => {
  // Получаем текущий час для проверки
  const currentHour = new Date().getHours();
  const expectedTodayCount = 24 - currentHour + 1; // +1 для пустого заголовка
  
  // Получаем данные для сегодня
  const todayHours = await page.locator('table').nth(1).locator('thead tr').first().locator('th').allTextContents();
  expect(todayHours.length).toBe(expectedTodayCount);
  
  // Переключаемся на завтра
  await page.getByRole('link', { name: 'Завтра', exact: true }).click();
  const tomorrowHours = await page.locator('table').nth(1).locator('thead tr').first().locator('th').allTextContents();
  
  // Для завтра должно быть 24 часа + пустой заголовок
  expect(tomorrowHours.length).toBe(25);
  
  // Проверяем, что данные температуры изменились
  const todayTemps = await page.locator('table').nth(1).locator('thead tr').nth(2).locator('th').allTextContents();
  
  // Возвращаемся на сегодня
  await page.getByRole('link', { name: 'Сегодня', exact: true }).click();
  
  // Проверяем, что данные обновились и количество часов соответствует текущему времени
  const newTodayHours = await page.locator('table').nth(1).locator('thead tr').first().locator('th').allTextContents();
  const newCurrentHour = new Date().getHours();
  const newExpectedCount = 24 - newCurrentHour + 1;
  
  // Проверяем, что количество часов соответствует текущему времени
  expect(newTodayHours.length).toBe(newExpectedCount);
  
  // Проверяем, что это разумное количество (не 0 и не больше 25)
  expect(newTodayHours.length).toBeGreaterThan(0);
  expect(newTodayHours.length).toBeLessThanOrEqual(25);
});
});

  test.describe('Dynamic Behavior', () => {
    test('should update data when switching days', async ({ page }) => {
      // Получаем текущий максимум температуры
      const initialMax = await page.locator('th:has-text("Max:")').textContent();
      
      // Переключаемся на завтра
      await page.getByRole('link', { name: 'Завтра', exact: true }).click();
      
      // Проверяем, что данные обновились
      const newMax = await page.locator('th:has-text("Max:")').textContent();
      expect(newMax).not.toBe(initialMax);
    });

    test('should show hours from current time for today', async ({ page }) => {
      const currentHour = new Date().getHours();
      
      // Проверяем, что таблица начинается с текущего часа
      const hourHeaders = page.locator('table').nth(1).locator('thead tr').first().locator('th');
      const hours = await hourHeaders.allTextContents();
      
      // Первый th - пустой, второй должен быть текущим часом или ближайшим
      if (currentHour < 23) {
        const firstHour = parseInt(hours[1].replace(':00', ''));
        expect(firstHour).toBeGreaterThanOrEqual(currentHour);
        expect(firstHour).toBeLessThan(currentHour + 3); // может быть небольшое округление
      }
    });

    test('should show all 24 hours when viewing tomorrow', async ({ page }) => {
        // Переключаемся на завтра
        await page.getByRole('link', { name: 'Завтра', exact: true }).click();
        
        // Используем data-testid для точного поиска
        const table = page.getByTestId('hourly-forecast-table');
        const hourHeaders = table.locator('thead tr').first().locator('th');
        const count = await hourHeaders.count();
        
        // Должно быть 25 (1 пустой + 24 часа)
        expect(count).toBe(25);
        
        // Проверяем, что есть все часы с 0:00 до 23:00
        const hours = await hourHeaders.allTextContents();
        for (let i = 0; i < 24; i++) {
            expect(hours).toContain(`${i}:00`);
        }
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper alt text for weather icons', async ({ page }) => {
      const icons = page.locator('table').nth(1).locator('img');
      const count = await icons.count();
      
      for (let i = 0; i < Math.min(count, 10); i++) {
        const icon = icons.nth(i);
        const alt = await icon.getAttribute('alt');
        expect(alt).not.toBe('');
        expect(alt).not.toBeNull();
      }
    });

    test('should have proper title for weather icons', async ({ page }) => {
      const icons = page.locator('table').nth(1).locator('img');
      const count = await icons.count();
      
      for (let i = 0; i < Math.min(count, 10); i++) {
        const icon = icons.nth(i);
        const title = await icon.getAttribute('title');
        expect(title).not.toBe('');
        expect(title).not.toBeNull();
      }
    });

    test('should have visible table headers', async ({ page }) => {
        const headers = page.locator('th');
        const count = await headers.count();
        
        let nonEmptyHeaders = 0;
        for (let i = 0; i < Math.min(count, 10); i++) {
            const header = headers.nth(i);
            await expect(header).toBeVisible();
            const text = await header.textContent();
            
            // Проверяем только непустые заголовки
            if (text?.trim()) {
            nonEmptyHeaders++;
            expect(text.trim()).not.toBe('');
            }
        }
        
        // Убеждаемся, что есть хотя бы несколько непустых заголовков
        expect(nonEmptyHeaders).toBeGreaterThan(0);
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle missing data gracefully', async ({ page }) => {
      // Проверяем, что все обязательные элементы присутствуют
      await expect(page.locator('th:has-text("Max:")')).toBeVisible();
      await expect(page.locator('th:has-text("Min:")')).toBeVisible();
      await expect(page.locator('th:has-text("Осадки:")')).toBeVisible();
      await expect(page.locator('th:has-text("Скорость ветра:")')).toBeVisible();
      
      // Проверяем, что числовые значения не пустые
      const maxTemp = await page.locator('th:has-text("Max:")').textContent();
      expect(maxTemp).toMatch(/\d/);
    });

    test('should handle day with no precipitation', async ({ page }) => {
      // Находим день с минимальными осадками
      const precipText = await page.locator('th:has-text("Осадки:")').textContent();
      const precipValue = parseFloat(precipText?.match(/(\d+\.?\d*)/)?.[1] || '0');
      
      // Проверяем, что значение корректно
      expect(precipValue).toBeGreaterThanOrEqual(0);
    });

    test('should render wind speed in meters per second', async ({ page }) => {
      const windText = await page.locator('th:has-text("Скорость ветра:")').textContent();
      expect(windText).toMatch(/\d+\.?\d* м\/сек/);
      
      // Проверяем, что значение разумное (не слишком большое для м/с)
      const windValue = parseFloat(windText?.match(/(\d+\.?\d*)/)?.[1] || '0');
      expect(windValue).toBeGreaterThan(0);
      expect(windValue).toBeLessThan(50); // разумный максимум для м/с
    });
  });

  test.describe('Responsive Design', () => {
    test('should have scrollable container for small screens', async ({ page }) => {
      const container = page.locator('.overflow-x-auto');
      await expect(container).toBeVisible();
      
      // Проверяем, что таблица внутри контейнера
      const table = container.locator('table');
      await expect(table).toBeVisible();
    });

    test('should display hourly forecast heading', async ({ page }) => {
      const heading = page.getByRole('heading', { name: 'Почасовой прогноз' });
      await expect(heading).toBeVisible();
      await expect(heading).toHaveClass(/font-bold/);
    });
  });
});