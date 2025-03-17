function notEnumerable(target: any, key: string): void{
  Object.defineProperty(target, key, {
    enumerable: false,
    writable: true
  });
};

function Max(maxValue: number) {
  return function (target: any, propertyKey: string): void {
    let value: number = 0;

    const getter = function() {
      return value;
    };

    const setter = function(newValue: number) {
      value = newValue > maxValue ? maxValue : newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

function Min(minValue: number) {
  return function (target: any, propertyKey: string): void {
    let value: number = 0;

    const getter = function() {
      return value;
    };

    const setter = function(newValue: number) {
      value = newValue < minValue ? minValue : newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}


function checkName(target: any, key: string, descriptor: PropertyDescriptor): void {
  const originalMethod = descriptor.value;
  
  descriptor.value = function () {
    if (!(this as Student).firstName || !(this as Student).lastName) {
      return "Пропуск"; 
    }
    return originalMethod.apply(this);
  };
}

export class Student {
  firstName: string = "";
  lastName: string = "";
  private _grade: number = 0; // Замість grade використовується _grade

  @Min(0)
  @Max(12)
  set grade(value: number) {
    this._grade = value;
  }

  get grade(): number {
    return this._grade;
  }

  group: string = "";

  @checkName
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
