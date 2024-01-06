import {NgModule} from "@angular/core";
import {MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions} from "@angular/material/core";

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true
};

@NgModule({
  providers: [
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig
    }
  ]
})
export class AngularMaterialModule {
}
