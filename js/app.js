var dkrm = new Darkroom('#target', {
  // Size options
  minWidth: 100,
  minHeight: 100,
  maxWidth: 9999,
  maxHeight: 9999,

  plugins: {
    save: false,
    watermark: false,
    ocr: {
      callback: function(language, event) {
        var canvas = document.querySelector('.lower-canvas');
        var ctx = canvas.getContext('2d');
        Tesseract
          .recognize(ctx, {lang: language.value})
          .progress(function(p) {
            app.$data.status = p.status;
            app.$data.progress = p.progress * 100;
          })
          .then(function(result) {
            app.$data.recognizedText = result.text;
          });
      }
    }
  }
});