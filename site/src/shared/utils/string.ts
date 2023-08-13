export function isNullOrEmpty(str: string) {
    return (!str || 0 === str.length);
}

export const trim = (str: string): string => str.replace(/ /g,'');

export function isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

export  function validatePhoneNumber(input_str: string){
    // eslint-disable-next-line no-useless-escape
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(input_str);
}

export const truncate = (input: string, length: number) => {
    if(input) return input.length > length ? `${input.substring(0, length)}...` : input;
}

export function isEmpty(obj: any) {
    for(var prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }

export function isStringEmpty(str: string) {
    return (!str || 0 === str.length);
}

export const generateRandomNumber = () => Math.floor(100000 + Math.random() * 900000).toString().substring(0, 4)