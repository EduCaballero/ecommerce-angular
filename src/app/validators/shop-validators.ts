import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopValidators {

  /*static notOnlyWhiteSpace(control: FormControl) : ValidationErrors | null {
    if((control.value as string).indexOf(' ') >= 0){
        return {'notOnlyWhiteSpace': true}
    }
    return null;
  }*/

  static notOnlyWhiteSpace(control: FormControl): ValidationErrors {
    if ((control.value != null) && (control.value.trim().length === 0)) {
        return { 'notOnlyWhiteSpace': true };
    }
        return null!;
  }

}
