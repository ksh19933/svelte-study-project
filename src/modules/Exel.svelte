<script>
    import { exelStore } from "./store.js";
    import { read, utils } from 'xlsx';

    const onChangeHandler = (e) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0])
      reader.onload = (e) => {
        const data = reader.result;
        const wb = read(data);
        const filename = wb.SheetNames[0];
        const ws = wb.Sheets[filename];
        exelStore.update(()=> utils.sheet_to_json(ws));
      }
    }
</script>

<div>
    <input class="hi" type="file" on:change={onChangeHandler}/>
</div>

<style>
    .hi{

    }

</style>