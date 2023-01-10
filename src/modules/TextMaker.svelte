<script>
  import { titleStore, mainTextStore, dateStore, signatureStore } from "./store.js";

  let title = "";
  let mainText = "";
  let date = "";
  let signature = "";
</script>
<div>
    <div class="row-24 align-start">
        <div class="col-24">
            <h2>제목</h2>
            <div>
                <div class="row-8">
                    <input bind:value={title} />
                    <button on:click={()=>{
                      titleStore.update(()=>title);
                      title="";
                    }}>등록</button>
                </div>
            </div>
            <div class="row">
                제목: {$titleStore}
            </div>
        </div>
        <div class="col-24">
            <h2>본문</h2>
            <div>
                <div class="row-8">
                    <textarea bind:value={mainText} />
                    <div>
                        <button on:click={() => {
                          mainTextStore.update(()=>mainText);
                          mainText="";
                        }}>등록</button>
                    </div>
                </div>
            </div>
            <div class="text-example">
                본문: {$mainTextStore}
            </div>
        </div>
    </div>
    <div class="row-24 align-start">
        <div class="col-24">
            <h2>시간</h2>
            <div>
                <div class="row-8">
                    <input bind:value={date} />
                    <button on:click={()=>{
                      dateStore.update(()=>date);
                      date="";
                    }}>등록</button>
                </div>
            </div>
            <div class="row">
                시간: {$dateStore}
            </div>
        </div>
        <div class="col-24">
            <h2>서명</h2>
            <div>
                <div class="row-8">
                    <input bind:value={signature} />
                    <button on:click={()=>{
                      signatureStore.update(()=>signature);
                      signature="";
                    }}>등록</button>
                </div>
            </div>
            <div class="row">
                서명: {$signatureStore}
            </div>
        </div>
    </div>
</div>

<style>
    .text-example{
        white-space: pre-wrap;
    }
    textarea{
        width: 400px;
        height: 150px;
    }
    .align-start{
        align-items: flex-start;
    }
</style>
