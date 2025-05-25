const items = [
  { name: "Ноутбук", price: 20000 },
  { name: "Смартфон", price: 10000 },
  { name: "Навушники", price: 1500 },
  { name: "Монітор", price: 5000 },
  { name: "Безпровідна миша", price: 800 },
];

class FilterSystem {
  constructor(data) {
    this.originalData = data;
    this.filteredData = [...data];
    this.searchTerm = '';
    this.sortCriterion = 'name';

    this.searchInput = document.getElementById('search');
    this.sortSelect = document.getElementById('sortBy');
    this.resetButton = document.getElementById('resetFilters');
    this.container = document.getElementById('items-container');

    this.addEventListeners();
    this.render();
  }

  addEventListeners() {
    this.searchInput.addEventListener('input', (e) => {
      this.searchTerm = e.target.value.toLowerCase();
      this.applyFilters();
    });

    this.sortSelect.addEventListener('change', (e) => {
      this.sortCriterion = e.target.value;
      this.applyFilters();
    });

    this.resetButton.addEventListener('click', () => {
      this.searchTerm = '';
      this.sortCriterion = 'name';
      this.searchInput.value = '';
      this.sortSelect.value = 'name';
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredData = this.originalData.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm)
    );
    this.sortData();
    this.render();
  }

  sortData() {
    const criterion = this.sortCriterion;
    this.filteredData.sort((a, b) => {
      if (criterion === 'name') {
        return a.name.localeCompare(b.name);
      } else if (criterion === 'priceAsc') {
        return a.price - b.price;
      } else if (criterion === 'priceDesc') {
        return b.price - a.price;
      }
      return 0;
    });
  }

  render() {
    this.container.innerHTML = '';
    if (this.filteredData.length === 0) {
      this.container.innerHTML = '<p>Нічого не знайдено</p>';
      return;
    }
    this.filteredData.forEach(item => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `<h3>${item.name}</h3><p class="price">${item.price} грн</p>`;
      this.container.appendChild(div);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FilterSystem(items);
});
