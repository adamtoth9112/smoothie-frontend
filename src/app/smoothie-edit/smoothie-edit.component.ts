import { SmoothiesService } from './../smoothies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-smoothie-edit',
  templateUrl: './smoothie-edit.component.html',
  styleUrls: ['./smoothie-edit.component.scss'],
})
export class SmoothieEditComponent {
  id: number;
  editMode = false;
  form: FormGroup;

  get smoothieControls() {
    return (this.form.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private smoothiesService: SmoothiesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onAddIngredient() {
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      this.smoothiesService.updateSmoothie(this.id, this.form.value);
    } else {
      this.smoothiesService.addSmoothie(this.form.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let name = '';
    let description = '';
    let ingredients = new FormArray<FormGroup>([]);

    if (this.editMode) {
      const smoothie = this.smoothiesService.getSmoothie(this.id);
      name = smoothie.name;
      description = smoothie.description;
      if (smoothie.ingredients) {
        for (let ingredient of smoothie.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount),
            })
          );
        }
      }
    }

    this.form = new FormGroup({
      name: new FormControl(name),
      description: new FormControl(description),
      ingredients: ingredients,
    });
  }
}
