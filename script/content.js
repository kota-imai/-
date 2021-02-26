// 圧縮化手順
// ①Minify
// ②https://obfuscator.io/で難読化


// 初期値はすべて
let settings = getDefaultSettings();
const serachEngineList = [];

// 設定を呼び出す
chrome.runtime.sendMessage({ type: "settings" }, function (res) {
	// ショップリンクをセットする
	if (res.nazotteSettings) {
		settings = JSON.parse(res.nazotteSettings)
	}
	// リストを作る
	if (settings.dispKeepa) {
		serachEngineList.push({ name: 'Keepaで検索', url: 'https://keepa.com/#!search/5-<x>', favicon: 'keepa.png' });
	}
	if (settings.dispAmazon) {
		serachEngineList.push({ name: 'amazonで検索', url: 'https://www.amazon.co.jp/s?k=<x>&__mk_ja_JP=カタカナ&ref=nb_sb_noss', favicon: 'amazon.ico' })
	}
	if (settings.dispRakuten) {
		serachEngineList.push({ name: '楽天市場で検索', url: 'https://search.rakuten.co.jp/search/mall/<x>/', favicon: 'rakuten.png' })
	}
	if (settings.dispYshop) {
		serachEngineList.push({ name: 'Yahoo!ショッピングで検索', url: 'https://shopping.yahoo.co.jp/search?p=<x>', favicon: 'yahooshopping.png' })
	}
	if (settings.dispYauc) {
		serachEngineList.push({ name: 'ヤフオクで検索', url: 'https://auctions.yahoo.co.jp/search/search?p=<x>', favicon: 'yahooauc.png' })
	}
	if (settings.dispMercari) {
		serachEngineList.push({ name: 'メルカリで検索', url: 'https://www.mercari.com/jp/search/?keyword=<x>', favicon: 'mercari.png' })
	}
	if (settings.dispRakuma) {
		serachEngineList.push({ name: 'ラクマで検索', url: 'https://fril.jp/search/<x>', favicon: 'rakuma.png' })
	}
	if (settings.dispKakaku) {
		serachEngineList.push({ name: '価格.comで検索', url: 'https://kakaku.com/search_results/<x>/', favicon: 'kakaku.png' })
	}
	if (settings.dispBic) {
		serachEngineList.push({ name: 'ビックカメラ.comで検索', url: 'https://www.biccamera.com/bc/category/?q={x}', favicon: 'biccamera.png' })
	}
	if (settings.dispYdbs) {
		serachEngineList.push({ name: 'ヨドバシドットコムで検索', url: 'https://www.yodobashi.com/?word=<x>', favicon: 'yodobashi.png' })
	}
	if (settings.dispWowma) {
		serachEngineList.push({ name: 'auPAYマーケットで検索', url: 'https://wowma.jp/itemlist?keyword={x}', favicon: 'aupay.png' })
	}
	if (settings.dispHikari) {
		serachEngineList.push({ name: 'ひかりTVショッピングで検索', url: 'https://shop.hikaritv.net/shopping/app/catalog/list/init?searchWord=<x>', favicon: 'hikaritv.png' })
	}
	if (settings.dispGgle) {
		serachEngineList.push({ name: 'Google検索', url: 'https://www.google.com/search?q=<x>', favicon: 'google.png' })
	}
})

var lib = {
	createTag: function (params) {
		params = params || {};
		var e = document.createElement(params.name);
		for (var prop in params.attrs) {
			if (prop == 'style') {
				e.setAttribute('style', params.attrs.style);
				for (var p in params.attrs.style)
					e.style[p] = params.attrs.style[p];
			} else {
				e.setAttribute(prop, params.attrs[prop]);
				e[prop] = params.attrs[prop];
			}
		}
		return e;
	},
	copyProperty: function (from, to) {
		for (var prop in from) {
			to[prop] = from[prop];
		}
	},
};

var ts = {
	id: 'traceSearchBar',
	searchEngineList: serachEngineList,
	keyword: '',
	speed: 250,
	isHovered: false,
	isShowed: false,
	isCreated: false,
	defaultSelectIndex: undefined,
	iconIdOnClicked: undefined,
	iconStyleOnMouseout: {
		margin: '4px 3px 0px 2px',
		padding: '5px',
		height: '27px',
		width: '27px',
		backgroundColor: '#ffffff',
		background: '-webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee))',
		border: '1px solid #aaaaaa',
		borderRadius: '7px',
		boxSizing: 'content-box',
		boxShadow: '0px 2px 3px 0px #555555',
		cursor: 'pointer',
		zoom: '100%',
		opacity: 1,
	},
	iconStyleOnMouseover: {
		boxShadow: '0px -13px 5px 0px #eeeeee inset',
	},
	iconStyleOnClicked: {
		boxShadow: '1px 1px 2px 0px #555555 inset',
		background: '#dddddd',
	},
	create: function () {
		var _ts = this;
		var bar = lib.createTag({
			name: 'div', attrs: {
				id: this.id,
				style: {
					zIndex: '100000000000',
					display: 'none',
					position: 'fixed',
					top: '-20px',
					left: '0px',
					height: '50px',
					width: '100%',
					textAlign: 'center',
					border: '0px solid lightgray',
					opacity: 0,
				},
				onmouseover: function () { _ts.isHovered = true; },
				onmouseout: function () { _ts.isHovered = false; }
			}
		});

		var list = this.searchEngineList;
		for (var n = 0; n < list.length; n++) {
			;
			var icon = lib.createTag({
				name: 'img', attrs: {
					id: 'traceSearchIcon' + n,
					className: 'traceSearchIcon',
					title: list[n].name,
					url: list[n].url,
					src: chrome.extension ? chrome.extension.getURL('favicons/' + list[n].favicon) : 'favicons/' + list[n].favicon,
					clicked: false,
					style: _ts.iconStyleOnMouseout,
					onmouseover: function () {
						if (_ts.iconIdOnClicked != this.id)
							lib.copyProperty(_ts.iconStyleOnMouseover, this.style);
					},
					onmouseout: function () {
						if (_ts.iconIdOnClicked != this.id)
							lib.copyProperty(_ts.iconStyleOnMouseout, this.style);
					},
					onclick: function () {
						if (_ts.iconIdOnClicked != this.id) {
							if (_ts.iconIdOnClicked) {
								lib.copyProperty(_ts.iconStyleOnMouseout, document.getElementById(_ts.iconIdOnClicked).style);
							}
							_ts.iconIdOnClicked = this.id;
							lib.copyProperty(_ts.iconStyleOnClicked, this.style);
						}

						if (_ts.defaultSelectIndex != undefined) {
							$('form:first').attr({ url: this.url });
							$('#submitBtn').val(this.title);
							$('#word').focus();
						}
						else {
							if (this.url.indexOf('<x>') > 0) {
								window.open(this.url.replace('<x>', encodeURI(_ts.keyword)), '_blank');
							}
							else if (this.url.indexOf('{x}') > 0) {
								window.open(this.url.replace('{x}', convertToShiftJis(_ts.keyword)), '_blank');
							}
							return null;
						}
					},
				}
			});
			if (_ts.defaultSelectIndex == n) {
				lib.copyProperty(_ts.iconStyleOnClicked, icon.style);
				_ts.iconIdOnClicked = icon.id;
				$('#submitBtn').val(icon.title);
			}

			bar.appendChild(icon);
		}

		document.body.appendChild(bar);
		this.isCreated = true;
	},
	show: function (word) {
		var _ts = this;
		if (!this.isCreated) this.create();
		this.keyword = word;
		$('#' + this.id).css({ display: 'block' });
		$('#' + this.id).animate({ top: '0px', opacity: 1 }, _ts.speed, function () {
			_ts.isShowed = true;
		});
	},
	hide: function () {
		var _ts = ts;
		if (!this.isCreated) return;

		if (_ts.iconIdOnClicked) {
			lib.copyProperty(_ts.iconStyleOnMouseout, document.getElementById(ts.iconIdOnClicked).style);
			_ts.iconIdOnClicked = undefined;
		}
		$('#' + this.id).animate({ top: '-20px', opacity: 0 }, _ts.speed, function () {
			$(this).css({ display: 'none' });
			_ts.isShowed = false;
		});

	},
	setDefaultSelectIndex: function (num) {
		this.defaultSelectIndex = num;
	},
};


$(function () {
	if (!location.href.match(/https:\/\/docs.google\.com\/spreadsheets\/.*/)) {
		$('html').bind('mousedown', function () {
			var selectionObj = document.getSelection();
			var str = selectionObj.toString();
			if (ts.isShowed && !ts.isHovered && !selectionObj.isCollapsed && !str.match(/$\s+$/))
				ts.hide();
		});
		$('html').bind('mouseup', function () {
			var selectionObj = document.getSelection();
			var str = selectionObj.toString();
			(!selectionObj.isCollapsed && !str.match(/$\s+$/)) ? ts.show(str) : ts.hide();
		});
	}
});




function getDefaultSettings() { 
	return {
		dispAmazon: true,
		dispBic: true,
		dispGgle: true,
		dispHikari: true,
		dispKakaku: true,
		dispKeepa: true,
		dispMercari: true,
		dispRakuma: true,
		dispRakuten: true,
		dispWowma: true,
		dispYauc: true,
		dispYdbs: true,
		dispYshop: true,
	}
}

// 文字列を配列に変換する
function convertStrToArrays(str) {
	if (str.length > 0) {
		let array = [], i, il = str.length
		for (i = 0; i < il; i++) array.push(str.charCodeAt(i))
		return array
	}
	return ''
}
// Shift-JIS文字コード変換
function convertToShiftJis(str) {
	const sjis = Encoding.urlEncode(Encoding.convert(convertStrToArrays(str), 'SJIS'));
	return sjis
}