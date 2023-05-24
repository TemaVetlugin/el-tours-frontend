### Валидаторы и валидация
#### Именование
Название валидатора и файла должно соответствовать `is{Something}`

#### Написание валидатора
Функция валидации должна следовать типу:

```typescript
type Validator = (...args: any[]) => (value: any) => true | string
```

Также falsy значения в обычном валидаторе должны выдавать положительный результат

Пример:

* isEmail('')
  * isValid = true
* isEmail(null)
  * isValid = true
* isEmail(undefined)
  * isValid = true
* isEmail(false)
  * isValid = true
* isEmail('dasdsa')
  * isValid = false
* isEmail('aaa@aaa.com')
    * isValid = true


#### Использование
Для проверки обязательно поле например емейла, используются комбинированный валидатор:
* [isRequired(), isEmail()]

