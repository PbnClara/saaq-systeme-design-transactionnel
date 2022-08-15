#### Using Form Validation

Carbon Components provides HTML attributes and CSS to enable form validation for each input or control.

For example, here's a __Select__ that provides a message if an option is not selected.

```html
<div class="sdt-form-item">
  <label for="select-id" class="sdt-label">Select</label>
  <div data-invalid class="sdt-select">
    <select id="select-id" class="sdt-select-input">...</select>
    ...
  </div>
  <div class="sdt-form-requirement">
    Please select an option.
  </div>
</div>
```

The `sdt-form-requirement` element will be hidden until `data-invalid` attribute gets added to `sdt-select`.
Validate the select on your own and then use JavaScript to add the attribute if the select value is invalid.
