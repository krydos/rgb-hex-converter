var app = new Vue({
		el: '#app',
		data: {
				hexColor: '',
				rgbColor: '',
				bgColor: ''
		},
		methods: {
				copyRgb: function () {
						document.querySelector('#rgb-input').select();
						document.execCommand('copy');
				},
				copyHex: function () {
						document.querySelector('#hex-input').select();
						document.execCommand('copy');
				},
				_componentToHex: function (c) {
						console.log('calling component');
						const hex = c.toString(16);
						return hex.length == 1 ? "0" + hex : hex;
				},
				_rgbToHex: function (r, g, b) {
						return this._componentToHex(r)
								+ this._componentToHex(g)
								+ this._componentToHex(b);
				},
				_rgbStringToHex: function(s) {
						const rgb_arr = s.split(' ').map(function(item) {
								return parseInt(item);
						});
						if (rgb_arr.length == 3) {
								return this._rgbToHex(rgb_arr[0],
																		 rgb_arr[1],
																		 rgb_arr[2]);
						}
						return '';
				},
				_hexToRgb: function (hex) {
						const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
						return result ? parseInt(result[1], 16).toString() + ' '
								+	parseInt(result[2], 16).toString() + ' '
								+ parseInt(result[3], 16).toString()
								: '';
				}
		},
		watch: {
				hexColor: function (val) {
						console.log('hexColor = ', val);
						const rgb = this._hexToRgb(val);
						if (rgb) {
								this.rgbColor = rgb;
								this.bgColor = '#' + val;
						}

				},
				rgbColor: function (val) {
						console.log('rgbColor = ', val);
						const hex = this._rgbStringToHex(val);
						if (hex) {
								this.hexColor = hex;
								this.bgColor = '#' + hex;
						}
				}
		}
});
