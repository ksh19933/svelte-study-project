<script>
  import {bgImgStore, proImgStore, sigImgStore} from "./store.js";
</script>

<h2>이미지</h2>
<div class="col-12">
    <div>
        배경화면: <input type="file" on:change={(e)=>bgImgStore.update(()=>e.target.files[0])}/>
    </div>
    <div>
        제품: <input type="file" on:change={(e)=>proImgStore.update(()=>e.target.files[0])}/>
    </div>
    <div>
        서명: <input type="file" on:change={(e)=>sigImgStore.update(()=>e.target.files[0])}/>
    </div>
</div>
