# request-synchronizer
Request Synchronizer for node.js + express


## Работа с модулем
Для работы используется глобальный класс **RequestSynchronizer** и его статический метод **resolveRequest**

**resolveRequest** принимает следующие параметры:
1. **reqData: RequestData** - **RequestData** - объявлено в **request-synchronizer**;
2. **group: string** - Название группы запросов. Позволяет поддерживать конкурентность между разными группами запросов.

**RequestData** состоит из:
1. **func: RequestFunction** - **RequestFunction** - объявлено в **request-synchronizer**;
    - **RequestFunction** - функция, принимающая 2 параметра - req: Request и res: Response (express);
2. **req: Request (express)**;
3. **res: Response (express)**.

_Красота в простоте._
