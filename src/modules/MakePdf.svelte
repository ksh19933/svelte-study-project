<script>
  import { onMount } from "svelte";
  import html2canvas from "html2canvas";
  import { jsPDF } from "jspdf";
  import {pdfListStore} from "./store.js";

  export let texts = {
    key: "",
    title: "",
    mainText: "",
    date: "",
    signature: "",
  };
  export let bgSrc =  "";
  export let proSrc = "";
  export let sigSrc = "";

  onMount(()=>{
    convertToPdf(texts.title);
  })

  let a4;
  const convertToPdf = async (name) => {
    const canvas = await html2canvas(a4, {
      width: 1756,
      height: 1237,
    });
    const imageFile = canvas.toDataURL("image/jpeg");

    // imageFile to pdf
    const doc = new jsPDF("l", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const widthRatio = pageWidth / canvas.width;

    await doc.addImage(
      imageFile,
      "JPEG",
      0,
      0,
      pageWidth,
      canvas.height * widthRatio
    );

    pdfListStore.update((pdfList)=>[...pdfList, new File([doc.output("blob")], `${texts.title}_수료증.pdf`.replace(" 님", ""), {
      type: "application/pdf",
    })])

    // await doc.save(name+"_이력서")
    // return new File([doc.output("blob")], "temp.pdf", {
    //   type: "application/pdf",
    // });
  };
</script>

<div class="pdf">
    <div class="a4" bind:this={a4}>
        <img  src={bgSrc} class="bgImg" alt="배경화면">
            <div class="subtitle">스파르타코딩클럽 메이킹 챌린지 13기</div>
            <div class="title">{texts.title}</div>
            <div class="mainText">{texts.mainText}</div>
        <div class="signature">
            <div class="sigDateDiv">
                <div class="sigDate">{texts.date}</div>
                <div class="sigText">수료 날짜</div>
            </div>
<!--            <div class="proImgDiv">-->
<!--                <img src={proSrc} class="proImg" alt="제품">-->
<!--            </div>-->
            <div class="sigDiv">
                <img src={sigSrc} class="sigImg" alt="서명"/>
                {texts.signature}
            </div>
        </div>
    </div>
</div>

<style>
    .pdf{
        height: 0;
        overflow: hidden;
    }
</style>