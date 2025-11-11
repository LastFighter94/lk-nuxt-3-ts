# Мой девайс API для Frontend

_версия 2.1.1_

## Общая информация

**Адрес тестового сервера:** https://api.moydevice.ru

**Префикс обращения к API:** ```/api/v2```

**Метод авторизации:** Bearer token

Во всех ответах сервера присутствует два обязательных поля:

- ```StatusCode``` - код ответа сервера

- ```error``` - описание ошибки

**Стандартные значения:**
gender (пол):

- 1 = мужской
- 2 = женский

type (тип клиента):

- 1 = физическое лицо
- 2 = курьер
- 3 = партнер

citizenship (гражданство):

- 1 = Россия
- 2 = Другие страны

status (подписки):

- 1 = не активна
- 2 = требуется оплата
- 3 = доставка
- 4 = в аренде
- 5 = приостановлена

## Информационные каталоги

### Справочники с общей информацией

Запрос к серверу возвращает базовые справочники:

- Справочник стран
- Справочник городов (филиалов)
- Справочник Компаний
- Справочник категорий устройств
- Справочник устройств  и их описание

Базовые справочники необходимы для дальнейшей работы мобильного приложения, Личного кабинета, сайта.

**Тип запроса:** ```GET```

**Запрос:** ```/info/catalog/```

**Авторизация:** токен пользователя

**Параметры запроса:**

- type - тип клиента (1=Физическое лицо / 2=Курьер / 3=Партнер)

**Ответ сервера:**

массив объектов
Цены на устройства возвращаются исходя из значения параметров пользователя "Город" и "Тип клиента"

- countries - массив стран
  - id - идентификатор страны
  - name - название
- cities - массив городов
  - id - идентификатор города
  - name - название города
    - address - адрес офиса для получения устройств
- branch - массив филиалов
  - id - идентификатор филиала
  - name - название филиала
- companies - массив компаний
  - id - идентификатор компании
  - name - Название компании
  - logo - логотип компании
- gadgets - массив устройств
  - id - идентификатор устройства
  - name - название устройства/модели
    - model - название модели,
    - subscript - дополнительная информация,
  - categoyID - идентификатор категории устройства
  - images - массив ссылок на изображения устройства
  - prices - массив цен
    - month - количество месяцев
    - price - базовая стоимость подписки для указанного количества месяцев
      - insurancePrice - стоимость страховки в месяц
      - deliveryPrice - стоимость доставки
  - parameters - массив характеристик устройства
    - название параметра - значение параметра
    - manual - ссылка на инструкцию по работе с устройством
- category - массив категорий устройств
  - id - идентификатор категории
  - name - название категории
  - image - ссылка изображения категории
- org - информация об организации
  - name - название организации
  - address - юридический адрес
  - inn - ИНН
  - ogrn - ОГРН
  - phone - телефон
  - email - почта для обратной связи
  - workingHours - график работы
  - oferta - ссылка на страницу пользовательского соглашения
    - privacy - ссылка на страницу политики конфедициальности
  - chat - ссылка на страницу чата

**Пример:**

```json
{
    "statusCode": 200,
    "error": "None",
    "countries": [
        {
            "id": "integer",
            "name": "string"
        }
    ],
    "cities": [
        {
            "id": "integer",
            "name": "string",
                        "address": "string",
                        "oferta": "string",
                        "privacy": "string",
                        "faq": "string"
        }
    ],
    "branch": [
        {
            "id": "integer",
            "name": "string"
        }
    ],
    "companies": [
        {
            "id": "integer",
            "name": "string",
            "logo": "url"
        }
    ],
    "gadgets": [
        {
            "id": "integer",
            "name": "string",
                        "model": "string",
                        "subscript": "string",
            "categoyID": "integer",
            "images": [
                "url"
            ],
            "prices": [
                {
                    "month": "integer",
                    "price": "integer",
                                        "insurancePrice": "integer",
                                        "deliveryPrice": "integer"
                }
            ],
            "parameters": [
                {"название параметра": "значение параметра"}
            ],
                        "manual": "string"
        }
    ],
    "category": [
        {
            "id": "integer",
            "name": "string",
            "image": "url"
        }
    ],
        "org": [
            {
                "name": "string",
                "address": "string",
                "inn": "string",
                "ogrn": "string",
                "phone": "string",
                "email": "string",
                "workingHours": "string",
                "oferta": "string",
                "privacy": "string",
                "chat": "string"
            }
        ],
        "rejectReasons": [
            {
                "id": 1,
                "rejectText": "Подписку на наши девайсы могут оформить только лица старше 18 лет."
            },
            {
                "id": 2,
                "rejectText": "Для подписки на этот девайс необходимо гражданство РФ. Вам нужно будет связаться с менеджером."
            },
            {
                "id": 3,
                "rejectText": "У вас уже есть активная подписка."
            }
        ],
  "commonRejectReasons": [
        "integer"
    ],
  "categoryRejectReasons": [
    {
      "categoryId": "integer",
      "rejectReasonId": 2
    }
  ]
}
```

### Справочник стран

Запрос к серверу возвращает справочник стран

**Тип запроса:** ```GET```

**Запрос:** ```/info/countries/```

**Авторизация:** токен пользователя

**Параметры запроса:** отсутствуют

**Ответ сервера:**

массив объектов

- countries - массив стран
  - id - идентификатор страны
  - name - название

**Пример:**

```json
{
  "statusCode": 200,
  "error": "None",
  "countries": [
    {
      "id": "integer",
      "name": "string"
    }
  ]
}
```

### Справочник городов/филиалов

Запрос к серверу возвращает справочник городов/филиалов

**Тип запроса:** ```GET```

**Запрос:** ```/info/cities/```

**Авторизация:** токен пользователя

**Параметры запроса:** отсутствуют

**Ответ сервера:**

массив объектов

- cities - массив городов/филиалов
  - id - идентификатор города
  - name - название

**Пример:**

```json
{
  "statusCode": 200,
  "error": "None",
  "cities": [
    {
      "id": "integer",
      "name": "string"
    }
  ]
}
```

### Справочник компаний

Запрос к серверу возвращает справочник компаний

**Тип запроса:** ```GET```

**Запрос:** ```/info/companies/```

**Авторизация:** токен пользователя

**Параметры запроса:** отсутствуют

**Ответ сервера:**

массив объектов

- companies - массив компаний
  - id - идентификатор компании
  - name - название компании
  - logo - логотип компании

**Пример:**

```json
{
  "statusCode": 200,
  "error": "None",
  "companies": [
    {
      "id": "integer",
      "name": "string",
      "logo": "url"
    }
  ]
}
```

## Работа с пользователем

Методы для работы с персональной информацией пользователя. Регистрация и авторизация пользователей в системе.

### Получение информации о пользователе

Запрос к серверу возвращает информацию о пользователе

**Тип запроса:** ```GET```

**Запрос:** ```/user/getinfo/```

**Авторизация:** токен пользователя

**Параметры запроса:** отсутствуют

**Ответ сервера:**

- clientID - идентификатор пользователя
- subscriptionID - идентификатор подписки пользователя
- registrationDate - дата регистрации пользователя в системе
- status - статус пользователя
- phone - телефон пользователя
- email - электронная почта пользователя
- firstName - Имя
- lastName - Фамилия
- patronymic - Отчество
- city - идентификатор города действия подписки
- branch - код филиала
- gender - пол пользователя
- birthdate - дата рождения пользователя
- citizenship - гражданство
- bonus - бонусный счет
- delete_personal_data - статус удаления персональных данных
- delete_personal_data_date - дата запроса на удаление персональных данных
- forbidden - статус запрещающий действия клиента
- communication - предпочитаемый способ обратной связи (2=whatsapp / 1=телефон)

**Пример:**

```json
{
  "statusCode": 200,
  "error": "None",
  "clientID": "string",
  "subscriptionID": "string",
  "registrationDate": "dateTime",
  "status": "string",
  "phone": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "patronymic": "string",
  "city": "integer",
  "branch": "integer",
  "gender": "integer",
  "birthdate": "dateTime",
  "citizenship": "integer",
  "communication": "integer",
  "bonus": "integer",
  "forbidden": "string",
  "delete_personal_data_date": "dateTime",
  "delete_personal_data": "boolean"  
}
```

### Изменение информации о пользователе

Запрос к серверу отправляет измененные данные и возвращает обновленную информацию о пользователе

**Тип запроса:** ```POST```

**Запрос:** ```/user/updateinfo/```

**Авторизация:** токен пользователя

**Параметры запроса:** ```JSON``` в теле запроса

- clientID - идентификатор пользователя (идентификатор используется для проверки, изменить его нельзя)
- phone - телефон пользователя
- email - электронная почта пользователя
- firstName - Имя
- lastName - Фамилия
- patronymic - Отчество
- city - идентификатор города действия подписки
- branch - код филиала
- gender - пол подьзователя
- birthdate - дата рождения пользователя
- citizenship - гражданство
- communication - предпочитаемый способ обратной связи (whatsapp / phone)

**Пример тела запроса:**

```json
{
  "clientID": "string",
  "phone": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "patronymic": "string",
  "city": "integer",
  "branch": "integer",
  "gender": "integer",
  "birthdate": "dateTime",
  "citizenship": "integer",
  "communication": "integer"
}
```

**Ответ сервера:**

- clientID - идентификатор пользователя
- subscriptionID - идентификатор подписки пользователя
- registrationDate - дата регистрации пользователя в системе
- status - статус пользователя
- phone - телефон пользователя
- email - электронная почта пользователя
- firstName - Имя
- lastName - Фамилия
- patronymic - Отчество
- city - идентификатор города действия подписки
- branch - код филиала
- gender - пол подьзователя
- birthdate - дата рождения пользователя
- citizenship - гражданство
- communication - предпочитаемый способ обратной связи (whatsapp / phone)

**Пример:**

```json
{
  "statusCode": 200,
  "error": "None",
  "clientID": "string",
  "subscriptionID": "string",
  "registrationDate": "dateTime",
  "status": "string",
  "phone": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "patronymic": "string",
  "city": "integer",
  "branch": "integer",
  "gender": "integer",
  "birthdate": "dateTime",
  "citizenship": "integer",
  "communication": "integer"
}
```

### Удаление пользовательских данных

Запрос к серверу выполняет отправку ASCII строку закодированную в base-64. Строка формируется из токен ключа и номера телефона пользователя

**Тип запроса:** `POST`

**Запрос:** `/user/deletepersonaldata/`

**Авторизация:** токен пользователя

**Параметры запроса:** `JSON` в теле запроса

- agreement - ключ токен + телефон пользователя

**Пример тела запроса:**

```json
{
    "agreement": "string"
}
```

**Ответ сервера:**

- birthdate - дата рождения пользователя

- bonus - бонусный счет

- branch - код филиала

- citizenship - гражданство

- city - идентификатор города действия подписки

- clientID - идентификатор пользователя

- communication - предпочитаемый способ обратной связи (2=whatsapp / 1=телефон)

- company - идентификатор компании

- delete_personal_data - статус удаления персональных данных

- delete_personal_data_date - дата запроса на удаление персональных данных

- email - электронная почта пользователя

- firstName - Имя

- forbidden - статус запрещающий действия клиента

- gender - пол подьзователя

- lastName - Фамилия

- patronymic - Отчество

- phone - телефон пользователя

- registrationDate - дата регистрации пользователя

- status - статус пользователя

- subscriptionID - идентификатор подписки пользователя

```json
{
  "statusCode": 200,
  "error": "None",
  "clientID": "string",
  "subscriptionID": "string",
  "registrationDate": "dateTime",
  "status": "string",
  "phone": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "patronymic": "string",
  "city": "integer",
  "branch": "integer",
  "gender": "integer",
  "birthdate": "dateTime",
  "citizenship": "integer",
  "communication": "integer",
  "bonus": "integer",
  "forbidden": "string"
  "delete_personal_data_date": "dateTime",
  "delete_personal_data": "boolean"  
}
```

### Регистрация пользователя

Запрос к серверу выполняет отправку номера телефона пользователя для последующей отправки кода проверки с помощью СМС. При отправке телефона производится первичная регистрация клиента.

**Тип запроса:** ```POST```

**Запрос:** ```/auth/registration/```

**Авторизация:** отсутствует

**Параметры запроса:** ```JSON``` в теле запроса

- phone - телефон пользователя
- type - тип клиента (1=Физическое лицо / 2=Курьер / 3=Партнер)

**Пример тела запроса:**

```json
{
    "phone": "string",
    "type": "string"
}
```

**Ответ сервера:**

**Пример:**

Стандартный ответ сервера со статусом

```json
{
  "statusCode": 200,
  "error": "None"
}
```

### Подтверждение регистрации пользователя

Запрос к серверу выполняет отправку кода подтверждения для проверки регистрации пользователя. При удачной проверке - устанавливается дата регистрации пользователя в системе.

**Тип запроса:** ```POST```

**Запрос:** ```/auth/confirmation/```

**Авторизация:** отсутствует

**Параметры запроса:** ```JSON``` в теле запроса

- phone - телефон пользователя
- code - код проверки

**Пример тела запроса:**

```json
{
    "phone": "string",
    "code":"string"
}
```

**Ответ сервера:**

- clientID - идентификатор пользователя в системе
- token - уникальный токен пользователя для выполнения последующих операций (изменяется при выходе из системы)

**Пример:**

Стандартный ответ сервера со статусом

```json
{
    "statusCode": 200,
    "error": "None",
    "clientID": "string",
    "token": "string"
}
```

## 

## Работа с бонусным счетом

Методы для пополнения бонусного счета

### Пополнение бонусного счета

Метод позволяет пополнять бонусный счет за счет введения промокода

**Тип запроса:** `POST`

**Запрос:** `/bonus/promo/`

**Авторизация:** токен пользователя

**Параметры запроса:** `JSON` в теле запроса

- promo - промокод

**Пример тела запроса:**

```json
{
    "promo": "string"
}
```

**Ответ сервера:**

- bonus - сумма бонуса по промокоду

- description - описание подтверждения или причины отклонения.

**Пример:**

```json
{
    "statusCode": "200",
    "error": "none",
    "description": "string",
    "bonus": "integer"
}
```

### Назначение бонусов на подписку

Метод позволяет назначить/отменить списание бонусов пользователя в пользу выбранной подписке. Списание производится в момент оплаты подписки.

**Тип запроса:** `POST`

**Запрос:** `/bonus/subscription/`

**Авторизация:** токен пользователя

**Параметры запроса:** `JSON` в теле запроса

- ID - идентификатор подписки

- bonus - списание бонусов (1=назначить / 0=отменить)

**Пример тела запроса:**

```json
{
    "ID": "integer",
    "bonus": "integer"
}
```

**Ответ сервера:**

**Пример:**

Стандартный ответ сервера со статусом

```json
{
  "statusCode": 200,
  "error": "None"
}
```

## Работа с подписками

Методы для получения и изменения информации о подписках пользователя.

### Информация о подписках

Метод для получения информации о текущих подписках пользователя.

**Тип запроса:** ```GET```

**Запрос:** ```/subscription/info/```

**Авторизация:** токен пользователя

**Параметры запроса:**

- type - тип клиента (1=Физическое лицо / 2=Курьер / 3=Партнер) не обязательный, по умолчанию = 1

**Ответ сервера:**

Массив объектов

- ID - идентификатор подписки

- clientID - идентификатор клиента

- nextPaymentDate - Дата следующего платежа в международном формате

- registrationDate - Дата создания подписки в международном формате

- returnDate - дата возврата девайса

- status - Статус подписки (active/pending/disabled)

- statusText - наименование текущего статуса подписки

- category - идентификатор категории устройства

- gadget - идентификатор устройства

- model - модель устройства

- sn - серийный номер устройства

- amount - стоимость подписки в копейках

- period - интервал подписки в месяцах

- insurance - наличие страховки (да/нет)

- insurancePrice - стоимость страховки

- paymentType - способ оплаты (предоплата/при получении)

- deliveryType - способ доставки (самовывоз/доставка)

- deliveryDate - дата доставки

- deliveryPrice - стоимость доставки

- address - адрес получения устройства (в случае доставки)

- city - город для которого действует подписка

- type - тип клиента (1=Физическое лицо / 2=Курьер / 3=Партнер)

- bonus - назначение бонусного счета в пользу данной подписки (назначен=1 / не назначен=0)

- device - перечень характеристик выбранного гаджета
  
  - categoryID - идентификатор категории девайса
  
  - icon_parameters - параметры 
    
    - name - имя параметра
    
    - value - значение параметра
    
    - icon - иконка параметра
  
  - id - идентификатор девайса
  
  - images - массив изображений
    
    - url - адрес изображения 
  
  - model - модель девайса 
  
  - name - наименование девайса 
  
  - parameters - описание карактеристик девайса

- discountDescription - описание введенного промокода

- needPayment - статус оплаты (false=есть / true=нет)

- price - сумма подписки за общий период без дополнительных атрибутов

- promoCode - использовался промокод (true / false)

- subscriptionEnd - Дата завершения подписки

- subscriptionStart - Дата начала подписки

**Пример:**

```json
{
  "statusCode": 200,
  "error": "None",
  "subscriptions" : [
    {
      "ID": "integer",
      "clientID": "string",
      "nextPaymentDate": "dateTime",
      "registrationDate": "dateTime",
      "returnDate": "dateTime"
      "status": "integer",
      "statusText": "string"
      "category": "string",
      "gadget": "string",
      "model": "string",
      "sn": "string",
      "amount": "integer",
      "period": "integer",
      "insurance": "boolean",
      "insurancePrice": "integer"
      "address": "string",
      "paymentType": "string",
      "deliveryType": "boolean",
      "deliveryDate": "dateTime"
      "deliveryPrice": "integer"
      "city": "integer",
      "type": "integer",
      "bonus": "integer",
      "discountDescription": "string",
      "needPayment": "boolean",
      "price": "integer",
      "promoCode": "boolean",
      "subscriptionEnd": "dateTime",
      "subscriptionStart": "dateTime",
      "device": {
            "categoryID": "integer",
            "icon_parameters": [
                {
                    "name": "string",
                    "icon": "string"
                    "value": "string"
                }
            ],
            "id": "integer",
            "images": [
                {
                    "url": "string"
                }
            ],
            "model": "string",
            "name": "string",
            "parameters": "object"
       },
    }
  ]
}
```

### Расчет стоимости подписки

Метод для получения расчета стоимости подписки.

**Тип запроса:** ```POST```

**Запрос:** ```/subscription/calculate/```

**Авторизация:** токен пользователя

**Параметры запроса:** ```JSON``` в теле запроса

- category - идентификатор категории устройства
- gadget - идентификатор устройства
- period - интервал подписки в месяцах
- insurance - наличие страховки (true/false)
- deliveryType - способ доставки (true/false)
- type - тип клиента (1=Физическое лицо / 2=Курьер / 3=Партнер)
- promo - промокод

**Пример тела запроса:**

```json
{
    "category": "string",
    "gadget": "string",
    "period": "integer",
    "promo": "string"
    "insurance": "boolean",
    "deliveryType": "boolean",
    "type": "integer"
}
```

**Ответ сервера:**

- category - идентификатор категории устройства
- gadget - идентификатор устройства
- amount - стоимость подписки в копейках
- period - интервал подписки в месяцах
- deviceAmount - стоимость подписки за выбранное количество месяцев
- insurance - наличие страховки (true/false)
- insuranceAmount - стоимость страховки за выбранное количество месяцев
- deliveryType - способ доставки (true/false)
- deliveryAmount - стоимость доставки
- city - идентификатор города действия подписки
- type - тип клиента (1=Физическое лицо / 2=Курьер / 3=Партнер)
- discount - сумма скидки по промокоду
- discountDescription - описание результата ввода промокада

**Пример:**

```json
{
    "statusCode": 200,
    "error": "None",
    "category": "string",
    "gadget": "string",
    "amount": "integer",
    "period": "integer",
    "deviceAmount": "integer",
    "insurance": "boolean",
    "insuranceAmount": "integer",
    "deliveryType": "string",
    "deliveryAmount": "integer",
    "city": "integer",
    "type": "integer",
    "discount": "integer",
    "discountDescription": "string"
}
```

### Изменение статуса подписки

Метод для изменения статуса подписки (активна/приостановлена)

**Тип запроса:** ```POST```

**Запрос:** ```/subscription/setstatus/```

**Авторизация:** токен пользователя

**Параметры запроса:** ```JSON``` в теле запроса

- subscriptionID - идентификатор подписки
- status - статус подписки (1=не активна/2=требуется оплата/3=доставка/4=в аренде/5=приостановлена)

**Пример тела запроса:**

```json
{
    "subscriptionID": "string",
    "status": "string"
}
```

**Ответ сервера:**

Массив объектов

- ID - идентификатор подписки

- clientID - идентификатор клиента

- nextPaymentDate - Дата следующего платежа в международном формате

- registrationDate - Дата создания подписки в международном формате

- returnDate - дата возврата девайса

- status - Статус подписки (active/pending/disabled)

- statusText - наименование текущего статуса подписки

- category - идентификатор категории устройства

- gadget - идентификатор устройства

- model - модель устройства

- sn - серийный номер устройства

- amount - стоимость подписки в копейках

- period - интервал подписки в месяцах

- insurance - наличие страховки (да/нет)

- insurancePrice - стоимость страховки

- paymentType - способ оплаты (предоплата/при получении)

- deliveryType - способ доставки (самовывоз/доставка)

- deliveryDate - дата доставки

- deliveryPrice - стоимость доставки

- address - адрес получения устройства (в случае доставки)

- city - город для которого действует подписка

- type - тип клиента (1=Физическое лицо / 2=Курьер / 3=Партнер)

- bonus - назначение бонусного счета в пользу данной подписки (назначен=1 / не назначен=0)

- device - перечень характеристик выбранного гаджета
  
  - categoryID - идентификатор категории девайса
  
  - icon_parameters - параметры
    
    - name - имя параметра
    
    - value - значение параметра
    
    - icon - иконка параметра
  
  - id - идентификатор девайса
  
  - images - массив изображений
    
    - url - адрес изображения
  
  - model - модель девайса
  
  - name - наименование девайса
  
  - parameters - описание карактеристик девайса

- discountDescription - описание введенного промокода

- needPayment - статус оплаты (false=есть / true=нет)

- price - сумма подписки за общий период без дополнительных атрибутов

- promoCode - использовался промокод (true / false)

- subscriptionEnd - Дата завершения подписки

- subscriptionStart - Дата начала подписки

**Пример:**

```json
{
  "statusCode": 200,
  "error": "None",
  "subscriptions" : [
    {
      "ID": "integer",
      "clientID": "string",
      "nextPaymentDate": "dateTime",
      "registrationDate": "dateTime",
      "returnDate": "dateTime"
      "status": "integer",
      "statusText": "string"
      "category": "string",
      "gadget": "string",
      "model": "string",
      "sn": "string",
      "amount": "integer",
      "period": "integer",
      "insurance": "boolean",
      "insurancePrice": "integer"
      "address": "string",
      "paymentType": "string",
      "deliveryType": "boolean",
      "deliveryDate": "dateTime"
      "deliveryPrice": "integer"
      "city": "integer",
      "type": "integer",
      "bonus": "integer",
      "discountDescription": "string",
      "needPayment": "boolean",
      "price": "integer",
      "promoCode": "boolean",
      "subscriptionEnd": "dateTime",
      "subscriptionStart": "dateTime",
      "device": {
            "categoryID": "integer",
            "icon_parameters": [
                {
                    "name": "string",
                    "icon": "string"
                    "value": "string"
                }
            ],
            "id": "integer",
            "images": [
                {
                    "url": "string"
                }
            ],
            "model": "string",
            "name": "string",
            "parameters": "object"
       },
    }
  ]
}
```

### Создание подписки

Метод для создания и подключения новой подписки для пользователя.

**Тип запроса:** ```POST```

**Запрос:** ```/subscription/create/```

**Авторизация:** токен пользователя

**Параметры запроса:** ```JSON``` в теле запроса

- category - идентификатор категории устройства
- gadget - идентификатор устройства
- amount - стоимость подписки в копейках
- period - интервал подписки в месяцах
- insurance - наличие страховки (true/false)
- paymentType - способ оплаты (предоплата = 1/при получении = 2)
- deliveryType - способ доставки (самовывоз = false/доставка = true)
- address - адрес получения устройства (в случае доставки)
- type - тип клиента (1=Физическое лицо / 2=Курьер / 3=Партнер)
- promo - промокод введеный пользователем

**Пример тела запроса:**

```json
{
  "category": "string",
  "gadget": "string",
  "amount": "integer",
  "period": "integer",
  "insurance": "boolean",
  "paymentType": "string",
  "deliveryType": "boolean",
  "address": "string",
  "type": "integer",
  "promo": "string"
}
```

**Ответ сервера:**

Массив объектов

- ID - идентификатор подписки

- clientID - идентификатор клиента

- nextPaymentDate - Дата следующего платежа в международном формате

- registrationDate - Дата создания подписки в международном формате

- returnDate - дата возврата девайса

- status - Статус подписки (active/pending/disabled)

- statusText - наименование текущего статуса подписки

- category - идентификатор категории устройства

- gadget - идентификатор устройства

- model - модель устройства

- sn - серийный номер устройства

- amount - стоимость подписки в копейках

- period - интервал подписки в месяцах

- insurance - наличие страховки (да/нет)

- insurancePrice - стоимость страховки

- paymentType - способ оплаты (предоплата/при получении)

- deliveryType - способ доставки (самовывоз/доставка)

- deliveryDate - дата доставки

- deliveryPrice - стоимость доставки

- address - адрес получения устройства (в случае доставки)

- city - город для которого действует подписка

- type - тип клиента (1=Физическое лицо / 2=Курьер / 3=Партнер)

- bonus - назначение бонусного счета в пользу данной подписки (назначен=1 / не назначен=0)

- device - перечень характеристик выбранного гаджета
  
  - categoryID - идентификатор категории девайса
  
  - icon_parameters - параметры
    
    - name - имя параметра
    
    - value - значение параметра
    
    - icon - иконка параметра
  
  - id - идентификатор девайса
  
  - images - массив изображений
    
    - url - адрес изображения
  
  - model - модель девайса
  
  - name - наименование девайса
  
  - parameters - описание карактеристик девайса

- discountDescription - описание введенного промокода

- needPayment - статус оплаты (false=есть / true=нет)

- price - сумма подписки за общий период без дополнительных атрибутов

- promoCode - использовался промокод (true / false)

- subscriptionEnd - Дата завершения подписки

- subscriptionStart - Дата начала подписки

**Пример:**

```json
{
  "statusCode": 200,
  "error": "None",
  "subscriptions" : [
    {
      "ID": "integer",
      "clientID": "string",
      "nextPaymentDate": "dateTime",
      "registrationDate": "dateTime",
      "returnDate": "dateTime"
      "status": "integer",
      "statusText": "string"
      "category": "string",
      "gadget": "string",
      "model": "string",
      "sn": "string",
      "amount": "integer",
      "period": "integer",
      "insurance": "boolean",
      "insurancePrice": "integer"
      "address": "string",
      "paymentType": "string",
      "deliveryType": "boolean",
      "deliveryDate": "dateTime"
      "deliveryPrice": "integer"
      "city": "integer",
      "type": "integer",
      "bonus": "integer",
      "discountDescription": "string",
      "needPayment": "boolean",
      "price": "integer",
      "promoCode": "boolean",
      "subscriptionEnd": "dateTime",
      "subscriptionStart": "dateTime",
      "device": {
            "categoryID": "integer",
            "icon_parameters": [
                {
                    "name": "string",
                    "icon": "string"
                    "value": "string"
                }
            ],
            "id": "integer",
            "images": [
                {
                    "url": "string"
                }
            ],
            "model": "string",
            "name": "string",
            "parameters": "object"
       },
    }
  ]
}
```

## Работа с платежами

Методы для проведения оплат и получения истории платежей.

### Обработка платежа

Метод для подтверждения и выполнения оплаты по выставленному счету. Оплата производится как первичная так и последующие (доплаты/штрафы). Списание каждый месяц производится на стороне API в автоматическом режиме и не требует обращения к этому методу. При отправке запроса происходит переадресация на страницу платежа банка.

**Тип запроса:** ```POST```

**Запрос:** ```/payment/payment-create/```

**Авторизация:** токен пользователя

**Параметры запроса:** ```JSON``` в теле запроса

- subscriptionId - идентификатор подписки
- type - тип клиента (1=Физическое лицо / 2=Курьер / 3=Партнер)
- city - город для которого действует подписка

**Пример тела запроса:**

```json
{
  "subscriptionId": "string",
  "type": "integer",
  "city": "0"
}
```

**Ответ сервера:**

Стандартный ответ сервера со статусом

- orderId - номер заказа в системе банка,
- formUrl - адрес страницы оплаты
- successurl - страница успешной оплаты
- failurl - страница не успешной оплаты

**Пример:**

```json
{
  "statusCode": 200,
  "error": "None",
    "orderId": "string",
  "formUrl": "string",
    "successurl": "string",
    "failurl": "string"
}
```

### Список привязанных карт

Список платежных карт которые были ранее привязаны к профилю пользователя. Активация любой выбранной карты производиться с помощью метода "Активация платежной карты". Активной может быть только одна карта из списка.

**Тип запроса:** ```GET```

**Запрос:** ```/payment/cards/```

**Авторизация:** токен пользователя

**Параметры запроса:** ```JSON``` в теле запроса

- subscriptionId - идентификатор подписки
- clientId - идентификатор клиента
- city - идентификатор города для которого действует подписка

**Пример тела запроса:**

```json
{
  "subscriptionId": "string",
  "clientId": "string",
  "city": "integer"
}
```

**Ответ сервера:**

Массив объектов

- cardID - идентификатор платежной карты
- card - номер платежной карты (первые и последние цифры)
- status - статус карты
- expire - дата окончания действия платежной карты (месяц/год)

**Пример:**

```json
{
  "statusCode": 200,
  "error": "None",
  "cards": [
    {
      "cardID": "string",
      "card": "string",
      "status": "string",
      "expire": "string"
    }
  ]
}
```

### Активация платежной карты

Дополнительный метод позволяющий привязать новую платежную карту к профилю пользователя для последующих автоматических списаний.

**Тип запроса:** ```POST```

**Запрос:** ```/payment/activate-card/```

**Авторизация:** токен пользователя

**Параметры запроса:** ```JSON``` в теле запроса

- subscriptionId - идентификатор подписки
- cardId - идентификатор карточки
- clientId - идентификатор клиента
- city - идентификатор города для которого действует подписка

**Пример тела запроса:**

```json
{
    "subscriptionId": "string",
    "clientID": "string",
    "cardID": "string",
    "city": "integer"
}
```

**Ответ сервера:**

Стандартный ответ сервера со статусом

**Пример:**

```json
{
  "statusCode": 200,
  "error": "None"
}
```

### Удаление платежной карты

Удаление платежной карты из списка доступных для привязки карт.

**Тип запроса:** ```POST```

**Запрос:** ```/payment/remove-card/```

**Авторизация:** токен пользователя

**Параметры запроса:** ```JSON``` в теле запроса

- subscriptionId - идентификатор подписки
- cardId - идентификатор карточки
- clientId - идентификатор клиента
- city - идентификатор города для которого действует подписка

**Пример тела запроса:**

```json
{
    "subscriptionId": "string",
    "clientID": "string",
    "cardID": "string",
    "city": "integer"
}
```

**Ответ сервера:**

Стандартный ответ сервера со статусом

**Пример:**

```json
{
  "statusCode": 200,
  "error": "None"
}
```

### Добавление платежной карты

Метод для добавления новой платежной карты в список карт пользователя. При добавление платежной карты происходит автоматическая активация новой платежной карты. При отправке запроса производится переадресация на страницу банка для оплаты платежа в 1 рубль.

**Тип запроса:** ```POST```

**Запрос:** ```/payment/bind-card/```

**Авторизация:** токен пользователя

**Параметры запроса:** ```JSON``` в теле запроса

- subscriptionId - идентификатор подписки
- clientId - идентификатор клиента
- city - город для которого действует подписка

**Пример тела запроса:**

```json
{
  "subscriptionId": "string",
  "clientId": "string",
  "city": "0"
}
```

**Ответ сервера:**

Стандартный ответ сервера со статусом

**Пример:**

```json
{
  "statusCode": 200,
  "error": "None"
}
```

### Список платежей

Метод получения истории платежей пользователя.

**Тип запроса:** ```GET```

**Запрос:** ```/payment/list/```

**Авторизация:** токен пользователя

**Параметры запроса:** ```JSON``` в теле запроса

- subscriptionId - идентификатор подписки
- clientId - идентификатор клиента
- city - идентификатор города для которого действует подписка

**Пример тела запроса:**

```json
{
  "subscriptionId": "string",
  "clientId": "string",
  "city": "integer"
}
```

**Ответ сервера:**

Массив объектов

- order - номер платежа
- cardID - идентификатор платежной карты
- status - статус платежа
- paymentdate - дата платежа в международном формате
- amount - сумма платежа
- paymenttype - тип платежа (1=первичный/2=автоматический/3=штраф/4=доплата)
- summary - краткое описание назначения платежа

**Пример:**

```json
{
  "statusCode": 200,
  "error": "None",
  "payments": [
    {
      "order": "string",
      "cardID": "string",
      "status": "string",
      "paymentdate": "dateTime",
      "amount":"integer",
      "paymenttype":"integer",
      "summary":"string"
    }
  ]
}
```