import { Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder,
        Validators,AbstractControl,ValidatorFn} from '@angular/forms'

import { Customer } from './customer';

function ratingRange(min:number, max:number): ValidatorFn{
    return (c: AbstractControl):{[key:string]:boolean}|null => {
        if(c.value != undefined && (isNaN(c.value)|| c.value<min || c.value>max)){
            return {'range':true}
        };
        return null
    }
}


@Component({
    selector: 'my-signup',
    templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit  {
    customerForm: FormGroup;
    customer: Customer= new Customer();

    constructor(private fb:FormBuilder){}

    ngOnInit(): void{
        this.customerForm = this.fb.group({

            firstName:['',[Validators.required,Validators.minLength(5)]],
            lastName :['',[Validators.required,Validators.maxLength(10)]],
            email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            phone:'',
            notification:'email',
            rating:['', ratingRange(1,8)]
        })

        this.customerForm.get('notification').valueChanges
                        .subscribe((value)=> this.setNotification(value))
    }

    setNotification(notifyVia:string):void{
        const phoneControl = this.customerForm.get('phone');
        if(notifyVia === "text"){
            phoneControl.setValidators(Validators.required)
        }else{
            phoneControl.clearValidators()
        }
            phoneControl.updateValueAndValidity()
    }
    populateData():void{
        this.customerForm.patchValue({
            email:'a@a.com'
        })
        
    }

    /*populateData():void{
        this.customerForm.setValue({
            firstName:'john',
            lastName:'mehtwe',
            email:'a@a.com'
        })
        
    }*/
    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }
 }
