document.addEventListener('DOMContentLoaded', function() {
    // एलिमेंट्स को पकड़ें
    const splitRatioSelect = document.getElementById('splitRatio');
    const customRatioDiv = document.getElementById('customRatioDiv');
    const customRatioInput = document.getElementById('customRatio');
    const calculateBtn = document.getElementById('calculate');
    const resultsDiv = document.getElementById('results');
    
    // स्प्लिट रेशियो सेलेक्ट पर इवेंट लिसनर
    splitRatioSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customRatioDiv.style.display = 'block';
        } else {
            customRatioDiv.style.display = 'none';
        }
    });
    
    // कैलकुलेट बटन पर इवेंट लिसनर
    calculateBtn.addEventListener('click', calculateSplit);
    
    // कैलकुलेशन फंक्शन
    function calculateSplit() {
        // इनपुट वैल्यूज प्राप्त करें
        const currentShares = parseFloat(document.getElementById('currentShares').value);
        const currentPrice = parseFloat(document.getElementById('currentPrice').value);
        
        // वैलिडेशन चेक
        if (isNaN(currentShares) || isNaN(currentPrice)) {
            alert('कृपया वैध संख्या दर्ज करें।');
            return;
        }
        
        if (currentShares <= 0 || currentPrice <= 0) {
            alert('शेयर्स और मूल्य धनात्मक होने चाहिए।');
            return;
        }
        
        // स्प्लिट रेशियो प्राप्त करें
        let splitRatio;
        const selectedRatio = splitRatioSelect.value;
        
        if (selectedRatio === 'custom') {
            splitRatio = parseFloat(customRatioInput.value);
            if (isNaN(splitRatio) || splitRatio <= 0) {
                alert('कृपया वैध कस्टम स्प्लिट रेशियो दर्ज करें।');
                return;
            }
        } else {
            splitRatio = parseFloat(selectedRatio.split(':')[0]);
        }
        
        // नए शेयर्स और प्राइस की गणना करें
        const newShares = currentShares * splitRatio;
        const newPrice = currentPrice / splitRatio;
        const totalValue = newShares * newPrice;
        
        // परिणाम दिखाएं
        document.getElementById('newShares').textContent = newShares.toLocaleString();
        document.getElementById('newPrice').textContent = newPrice.toFixed(2).toLocaleString();
        document.getElementById('totalValue').textContent = totalValue.toFixed(2).toLocaleString();
        
        resultsDiv.style.display = 'block';
    }
});
