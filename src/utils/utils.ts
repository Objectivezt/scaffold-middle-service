/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:34:11
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-05 17:42:26
 */
interface Person {
  firstName: string;
  lastName: string;
}

export function greeter(person: Person) {
  return `Hello, ${person.firstName} ${person.lastName}`;
}

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path: string) {
  return reg.test(path);
}

export function formatterMenu(data: any[], parentPath = '/') {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path
    };
    if (item.children) {
      result.children = formatterMenu(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  });
}
