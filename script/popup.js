function shoplinkInit() {
    // ショップリンク
    if (localStorage.getItem("nazotte-settings")) {
        const settings = JSON.parse(localStorage.getItem("nazotte-settings"));
        document.getElementById("customCheckKeepa").checked = settings.dispKeepa
        document.getElementById("customCheckAmazon").checked = settings.dispAmazon
        document.getElementById("customCheckRakuten").checked = settings.dispRakuten
        document.getElementById("customCheckYshop").checked = settings.dispYshop
        document.getElementById("customCheckYauc").checked = settings.dispYauc
        document.getElementById("customCheckMercari").checked = settings.dispMercari
        document.getElementById("customCheckRakuma").checked = settings.dispRakuma
        document.getElementById("customCheckKakaku").checked = settings.dispKakaku
        document.getElementById("customCheckHikari").checked = settings.dispHikari
        document.getElementById("customCheckWowma").checked = settings.dispWowma
        document.getElementById("customCheckYdbs").checked = settings.dispYdbs
        document.getElementById("customCheckBic").checked = settings.dispBic
        document.getElementById("customCheckGgle").checked = settings.dispGgle
    }
}
function eventListenCheckAll() {
    document.getElementById("check-all").addEventListener("click", function () {
        // すべてチェック
        document.getElementById("customCheckKeepa").checked = true
        document.getElementById("customCheckAmazon").checked = true
        document.getElementById("customCheckRakuten").checked = true
        document.getElementById("customCheckYshop").checked = true
        document.getElementById("customCheckYauc").checked = true
        document.getElementById("customCheckMercari").checked = true
        document.getElementById("customCheckRakuma").checked = true
        document.getElementById("customCheckKakaku").checked = true
        document.getElementById("customCheckHikari").checked = true
        document.getElementById("customCheckWowma").checked = true
        document.getElementById("customCheckYdbs").checked = true
        document.getElementById("customCheckBic").checked = true
        document.getElementById("customCheckGgle").checked = true
    }, false)
}
function eventListenShoplinkSave() {
    document.getElementById("shoplink-save").addEventListener("click", function () {
        // ショップリンク設定の保存
        let settings = {}
        settings.dispKeepa = document.getElementById("customCheckKeepa").checked
        settings.dispAmazon = document.getElementById("customCheckAmazon").checked
        settings.dispRakuten = document.getElementById("customCheckRakuten").checked
        settings.dispYshop = document.getElementById("customCheckYshop").checked
        settings.dispYauc = document.getElementById("customCheckYauc").checked
        settings.dispMercari = document.getElementById("customCheckMercari").checked
        settings.dispRakuma = document.getElementById("customCheckRakuma").checked
        settings.dispKakaku = document.getElementById("customCheckKakaku").checked
        settings.dispHikari = document.getElementById("customCheckHikari").checked
        settings.dispWowma = document.getElementById("customCheckWowma").checked
        settings.dispYdbs = document.getElementById("customCheckYdbs").checked
        settings.dispBic = document.getElementById("customCheckBic").checked
        settings.dispGgle = document.getElementById("customCheckGgle").checked
        localStorage.setItem("nazotte-settings", JSON.stringify(settings));
    }, false)
}

/*
 *  メイン処理
 */

// 初期化
shoplinkInit();
// イベントリスナー
eventListenShoplinkSave();
eventListenCheckAll();