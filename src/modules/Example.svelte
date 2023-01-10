<script>
  import JsZip from "jszip";
  import FileSaver from 'file-saver'
  import {
    exelStore,
    titleStore,
    mainTextStore,
    bgImgStore,
    proImgStore,
    dateStore,
    signatureStore,
    pdfListStore,
    sigImgStore
  } from "./store.js";
  import MakePdf from "./MakePdf.svelte";

  let bgSrc = "";
  let proSrc = "";
  let sigSrc = "";
  let idx = 0;
  let start = 0;
  let end = 0;
  let textList = [];
  let showBar = false;
  let inProgress = false;

  bgImgStore.subscribe((f) => {
    if(!f.name) return;
    bgSrc = URL.createObjectURL(f);
  })


  proImgStore.subscribe((f) => {
    if(!f.name) return;
    proSrc = URL.createObjectURL(f);
  })

  sigImgStore.subscribe((f)=>{
    if(!f.name) return;
    sigSrc = URL.createObjectURL(f);
  })

  pdfListStore.subscribe((list) => {
    if(list.length === 0 || list.length !== (end - start + 1) || inProgress ) return;
    inProgress = true;
    const zip = JsZip();
    list.forEach((blob, i)=>{
      zip.file(`${blob.name}`, blob);
    })
    zip.generateAsync({type: 'blob'}).then(zipFile=>{
      const fileName = '이력서_모음.zip';
      return FileSaver.saveAs(zipFile, fileName, "application/zip");
    })
    textList = [];
    setTimeout(()=>{
        showBar = false;
        pdfListStore.update(()=>[])
    }, 1000);
    inProgress = false;
  })


  $: getStr = (before, firstUser) =>{
    if(!before) return;
    let str = before;
    Object.keys(firstUser).forEach((key)=>{
        str = str.replaceAll("{" + key + "}", firstUser[key]);
    })
    return str
  }


  const onClickHandler = async () => {
    showBar = true;
    for(let i = start; i < end + 1; i++){
      const title = getStr($titleStore, $exelStore[i])
      const mainText = getStr($mainTextStore, $exelStore[i]);
      const date = getStr($dateStore, $exelStore[i]);
      const signature = getStr($signatureStore, $exelStore[i]);
      textList = [...textList, {
        key: "pdf" + i,
        title: title,
        mainText: mainText,
        date: date,
        signature: signature,
      }]
    }
  }

</script>

<div class="template col-24">
    <h2>예시</h2>
    <div class="a4 scale">
        <img src={bgSrc} class="bgImg" alt="배경화면">
        <div class="subtitle">스파르타코딩클럽 메이킹 챌린지 13기</div>
        {#if $exelStore.length > 0}
            <div class="title">{getStr($titleStore, $exelStore[idx])}</div>
            <div class="mainText">{getStr($mainTextStore, $exelStore[idx])}</div>
        {:else}
            <div class="title">{$titleStore}</div>
            <div class="mainText">{$mainTextStore}</div>
        {/if}
        <div class="signature">
            <div class="sigDateDiv">
                <div class="sigDate">{$dateStore}</div>
                <div class="sigText">수료 날짜</div>
            </div>
<!--            <div class="proImgDiv">-->
<!--                <img src={proSrc} class="proImg" alt="제품">-->
<!--            </div>-->
            <div class="sigDiv"><img src={sigSrc} class="sigImg" alt="서명" />{$signatureStore}</div>
        </div>
    </div>
    <div class="row-8">
        시작: <input type="number" bind:value={start}/>
        끝: <input type="number" bind:value={end}/>
        <button on:click={onClickHandler}> 만들기 </button>
    </div>
    {#if showBar}
        <div class="row-8">
            <progress value={$pdfListStore.length} min="0" max={end - start + 1}></progress>
            <div>{$pdfListStore.length} / {end - start + 1}</div>
        </div>
    {/if}
    <div>
        {#each textList as texts (texts.key)}
            <MakePdf texts={texts} bgSrc={bgSrc} proSrc={proSrc} sigSrc={sigSrc}/>
        {/each}
    </div>
</div>

<style>
    .template{
        max-width: 1024px;
        padding: 40px;
    }
    .scale{
        /*transform: translate(-298px, -200px) scale(0.66);*/
        /*margin-bottom: -380px;*/
    }
</style>
