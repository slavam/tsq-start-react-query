import { test, expect } from '@playwright/test';

test.describe('ForecastLinks Component', () => {
  test.beforeEach(async ({ page }) => {
    // Переходим на страницу, где находится компонент ForecastLinks
    // Предполагаем, что компонент находится на странице /forecastWeatherApi
    await page.goto('http://localhost:3000/forecastWeatherApi');
  });

  test('should display all three forecast links', async ({ page }) => {
    const todayLink = page.getByText('Сегодня', { exact: true });
    const tomorrowLink = page.getByText('Завтра', { exact: true });
    const dayAfterTomorrowLink = page.getByText('Послезавтра', { exact: true });

    await expect(todayLink).toBeVisible();
    await expect(tomorrowLink).toBeVisible();
    await expect(dayAfterTomorrowLink).toBeVisible();
    });

  test('should have correct CSS classes for today link', async ({ page }) => {
    const todayLink = page.getByRole('link', { name: 'Сегодня' });
    
    // Проверяем наличие классов стилей
    await expect(todayLink).toHaveClass(/bg-green-500/);
    await expect(todayLink).toHaveClass(/text-white/);
    await expect(todayLink).toHaveClass(/rounded/);
    await expect(todayLink).toHaveClass(/hover:bg-green-600/);
    await expect(todayLink).toHaveClass(/transition-colors/);
  });

  test('should have correct CSS classes for tomorrow link', async ({ page }) => {
    const tomorrowLink = page.getByRole('link', { name: 'Завтра', exact: true });
    
    await expect(tomorrowLink).toHaveClass(/bg-yellow-500/);
    await expect(tomorrowLink).toHaveClass(/text-white/);
    await expect(tomorrowLink).toHaveClass(/rounded/);
    await expect(tomorrowLink).toHaveClass(/hover:bg-yellow-600/);
    await expect(tomorrowLink).toHaveClass(/transition-colors/);
  });

  test('should have correct CSS classes for day after tomorrow link', async ({ page }) => {
    const dayAfterTomorrowLink = page.getByRole('link', { name: 'Послезавтра', exact: true });
    
    await expect(dayAfterTomorrowLink).toHaveClass(/bg-purple-500/);
    await expect(dayAfterTomorrowLink).toHaveClass(/text-white/);
    await expect(dayAfterTomorrowLink).toHaveClass(/rounded/);
    await expect(dayAfterTomorrowLink).toHaveClass(/hover:bg-purple-600/);
    await expect(dayAfterTomorrowLink).toHaveClass(/transition-colors/);
  });

  test('should navigate to correct URL with search param i_day=0 when clicking today', async ({ page }) => {
    const todayLink = page.getByRole('link', { name: 'Сегодня' });
    
    // Проверяем атрибут href
    await expect(todayLink).toHaveAttribute('href', '/forecastWeatherApi?i_day=0');
    
    // Кликаем и проверяем URL
    await todayLink.click();
    await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=0/);
  });

  test('should navigate to correct URL with search param i_day=1 when clicking tomorrow', async ({ page }) => {
    const tomorrowLink = page.getByRole('link', { name: 'Завтра', exact: true });
    
    await expect(tomorrowLink).toHaveAttribute('href', '/forecastWeatherApi?i_day=1');
    
    await tomorrowLink.click();
    await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=1/);
  });

  test('should navigate to correct URL with search param i_day=2 when clicking day after tomorrow', async ({ page }) => {
    const dayAfterTomorrowLink = page.getByRole('link', { name: 'Послезавтра', exact: true });
    
    await expect(dayAfterTomorrowLink).toHaveAttribute('href', '/forecastWeatherApi?i_day=2');
    
    await dayAfterTomorrowLink.click();
    await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=2/);
  });

  test('should have hover effects working', async ({ page }) => {
    const todayLink = page.getByRole('link', { name: 'Сегодня' });
    
    // Проверяем, что класс hover присутствует (проверка CSS, не фактического hover)
    await expect(todayLink).toHaveClass(/hover:bg-green-600/);
    
    // Для проверки фактического hover эффекта можно использовать:
    await todayLink.hover();
    // Здесь можно добавить проверку изменения стилей, если необходимо
    // Например, проверка computed styles после наведения
  });

  test('should render links in flex container with correct layout', async ({ page }) => {
    const container = page.locator('.flex.flex-wrap.gap-2.my-4');
    
    // Проверяем наличие контейнера
    await expect(container).toBeVisible();
    
    // Проверяем, что внутри контейнера ровно 3 ссылки
    const links = container.locator('a');
    await expect(links).toHaveCount(3);
    
    // Проверяем, что у контейнера есть правильные классы
    await expect(container).toHaveClass(/flex/);
    await expect(container).toHaveClass(/flex-wrap/);
    await expect(container).toHaveClass(/gap-2/);
    await expect(container).toHaveClass(/my-4/);
  });

  test('should have correct text content for all links', async ({ page }) => {
    const todayLink = page.getByRole('link', { name: 'Сегодня' });
    const tomorrowLink = page.getByRole('link', { name: 'Завтра', exact: true });
    const dayAfterTomorrowLink = page.getByRole('link', { name: 'Послезавтра', exact: true });
    
    await expect(todayLink).toHaveText('Сегодня');
    await expect(tomorrowLink).toHaveText('Завтра');
    await expect(dayAfterTomorrowLink).toHaveText('Послезавтра');
  });

  test('should have padding and styling applied to all links', async ({ page }) => {
  // Получаем каждую ссылку по точному тексту
  const links = [
    page.getByRole('link', { name: 'Сегодня', exact: true }),
    page.getByRole('link', { name: 'Завтра', exact: true }),
    page.getByRole('link', { name: 'Послезавтра', exact: true })
  ];
  
  // Проверяем каждую ссылку
  for (const link of links) {
    await expect(link).toHaveClass(/px-4/);
    await expect(link).toHaveClass(/py-2/);
    await expect(link).toHaveClass(/text-white/);
    await expect(link).toHaveClass(/rounded/);
    await expect(link).toHaveClass(/transition-colors/);
  }
})

  test('should maintain search parameters when navigating between days', async ({ page }) => {
    // Кликаем на "Завтра"
    await page.getByRole('link', { name: 'Завтра', exact: true }).click();
    await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=1/);
    
    // Затем кликаем на "Сегодня"
    await page.getByRole('link', { name: 'Сегодня' }).click();
    await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=0/);
    
    // Затем кликаем на "Послезавтра"
    await page.getByRole('link', { name: 'Послезавтра', exact: true }).click();
    await expect(page).toHaveURL(/.*forecastWeatherApi\?i_day=2/);
  });
});

// Дополнительный тест для проверки accessibility
test.describe('Accessibility tests', () => {
  test('should have accessible link text', async ({ page }) => {
    await page.goto('/forecastWeatherApi');
    
    // Проверяем, что все ссылки имеют доступные тексты
    const links = page.locator('a');
    for (let i = 0; i < await links.count(); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      expect(text).not.toBe('');
      expect(text).not.toBeNull();
    }
  });
});