export default class {
  constructor() {
    this.data = [];
    this.count = 0;

    this.INCREASE = 5;
  };

  init() {
    for (; this.count < 15; this.count++) {
      this.data.push({
        title: this.count
      });
    }
  };

  update() {
    console.log('update');
    return new Promise(resolve => {
      let countTo = this.count + this.INCREASE;

      for (; this.count < countTo; this.count++) {
        this.data.push({
          title: this.count
        });
      }

      // 模拟获取数据延时
      setTimeout(() => resolve(this.data), 500);
    });
  };
};