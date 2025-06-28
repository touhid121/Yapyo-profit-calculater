const dollarEl = document.getElementById('dollar-el');
const btnEl = document.getElementById('btn-el');
const ulEl = document.getElementById('ul-el');

btnEl.addEventListener('click', calculateProfit);

function calculateProfit() {
    const investmentAmount = parseFloat(dollarEl.value);
    
    // Clear previous results
    ulEl.innerHTML = '';
    
    // Validate input
    if (!investmentAmount || investmentAmount <= 0) {
        ulEl.innerHTML = '<li style="color:rgb(152, 14, 14);">Please enter a valid amount greater than $0</li>';
        return;
    }
    
    let buyFDV;
    
    // Determine buy FDV based on investment amount
    if (investmentAmount <= 100) {
        buyFDV = 600000; // 600k FDV
    } else if (investmentAmount <= 200) {
        buyFDV = 400000; // 400k FDV
    } else if (investmentAmount <= 300) {
        buyFDV = 300000; // 300k FDV
    } else {
        ulEl.innerHTML = '<li style="color: red;">Investment amount must be $300 or less</li>';
        return;
    }
    
    // Target FDVs for profit calculation
    const targetFDVs = [10000000, 20000000, 30000000, 40000000, 50000000, 100000000]; // 10M, 20M, 30M, 40M, 50M, 100M
    
    // Calculate and display profits
    const results = targetFDVs.map(targetFDV => {
        const multiplier = targetFDV / buyFDV;
        const totalValue = investmentAmount * multiplier;
        const profit = totalValue - investmentAmount;
        
        return {
            targetFDV: formatFDV(targetFDV),
            totalValue: totalValue.toFixed(2),
            profit: profit.toFixed(2),
            multiplier: multiplier.toFixed(2)
        };
    });
    
    // Display buy information
    ulEl.innerHTML = `<li><strong>Investment: $${investmentAmount} at ${formatFDV(buyFDV)} FDV</strong></li>`;
    
    // Display profit calculations
    results.forEach(result => {
        const profitColor = parseFloat(result.profit) > 0 ? 'green' : 'red';
        ulEl.innerHTML += `
            <li>
                At <strong>${result.targetFDV} FDV</strong>: 
                Total Value: <span style="color: white;">$${result.totalValue}</span> | 
                Profit: <span style="color: ${profitColor};">$${result.profit}</span> 
                (${result.multiplier}x)
            </li>
        `;
    });
}

function formatFDV(fdv) {
    if (fdv >= 1000000) {
        return (fdv / 1000000).toFixed(0) + 'M';
    } else if (fdv >= 1000) {
        return (fdv / 1000).toFixed(0) + 'K';
    }
    return fdv.toString();
}

// Allow Enter key to trigger calculation
dollarEl.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateProfit();
    }
});