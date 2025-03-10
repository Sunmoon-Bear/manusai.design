// 生成SVG Logo函数
function generateLogoSvg(brandName, description, style) {
    // 解析描述以确定Logo类型
    const keywords = description.toLowerCase().split(/\s+/);
    
    // 检测关键词
    const hasNature = keywords.some(word => ['自然', '树', '叶子', '花', '植物', 'nature', 'tree', 'leaf', 'flower', 'plant'].includes(word));
    const hasWater = keywords.some(word => ['水', '波浪', '海洋', '海', 'water', 'wave', 'ocean', 'sea'].includes(word));
    const hasGeometric = keywords.some(word => ['几何', '圆', '三角形', '正方形', 'geometric', 'circle', 'triangle', 'square'].includes(word));
    const hasAbstract = keywords.some(word => ['抽象', '现代', 'abstract', 'modern'].includes(word));
    const hasMountain = keywords.some(word => ['山', '峰', 'mountain', 'peak'].includes(word));
    
    // 设置SVG尺寸和视图框
    const svgWidth = 300;
    const svgHeight = 300;
    
    // 开始SVG标签
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}" width="${svgWidth}" height="${svgHeight}">`;
    
    // 根据样式设置线条粗细和颜色
    let strokeWidth = style === 'minimal' ? 1 : (style === 'handdrawn' ? 2 : 1.5);
    let strokeColor = '#000';
    let fillColor = 'none';
    
    // 根据描述和样式生成不同类型的Logo
    if (hasNature || (style === 'handdrawn' && !hasWater && !hasGeometric && !hasAbstract && !hasMountain)) {
        // 创建树或叶子Logo
        svg += `
            <g transform="translate(${svgWidth/2}, ${svgHeight/2})">
                <path d="M0,-80 L0,40" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="${fillColor}" />
                <path d="M0,-80 C-60,-40 -40,20 0,40 C40,20 60,-40 0,-80" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="${fillColor}" />
            </g>
        `;
    } else if (hasWater) {
        // 创建波浪Logo
        svg += `
            <g transform="translate(${svgWidth/2}, ${svgHeight/2})">
                <path d="M-100,0 C-70,-20 -30,20 0,0 C30,-20 70,20 100,0" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="${fillColor}" />
                <path d="M-100,30 C-70,10 -30,50 0,30 C30,10 70,50 100,30" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="${fillColor}" />
            </g>
        `;
    } else if (hasMountain) {
        // 创建山Logo
        svg += `
            <g transform="translate(${svgWidth/2}, ${svgHeight/2})">
                <path d="M-90,50 L-30,-50 L30,30 L90,-30" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="${fillColor}" />
            </g>
        `;
    } else if (hasGeometric || style === 'geometric') {
        // 创建几何Logo
        svg += `
            <g transform="translate(${svgWidth/2}, ${svgHeight/2})">
                <circle cx="0" cy="0" r="60" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="${fillColor}" />
                <circle cx="0" cy="0" r="40" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="${fillColor}" />
                <line x1="-60" y1="0" x2="60" y2="0" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <line x1="0" y1="-60" x2="0" y2="60" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
            </g>
        `;
    } else if (hasAbstract || style === 'abstract') {
        // 创建抽象Logo
        svg += `
            <g transform="translate(${svgWidth/2}, ${svgHeight/2})">
                <path d="M-50,-50 C0,-70 50,-20 50,30 C20,70 -30,50 -50,-50" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="${fillColor}" />
            </g>
        `;
    } else {
        // 默认 - 创建极简Logo
        svg += `
            <g transform="translate(${svgWidth/2}, ${svgHeight/2})">
                <circle cx="0" cy="-20" r="40" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="${fillColor}" />
                <line x1="-20" y1="20" x2="20" y2="20" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <line x1="-10" y1="40" x2="10" y2="40" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
            </g>
        `;
    }
    
    // 添加品牌名称
    if (brandName) {
        // 根据字符长度调整字体大小
        const fontSize = Math.max(12, Math.min(24, 200 / brandName.length));
        svg += `
            <text x="${svgWidth/2}" y="${svgHeight - 50}" 
                  text-anchor="middle" 
                  font-family="'Times New Roman', serif" 
                  font-size="${fontSize}" 
                  fill="${strokeColor}">
                ${brandName}
            </text>
        `;
    }
    
    // 结束SVG标签
    svg += '</svg>';
    
    return svg;
}

// 设置下载按钮功能
function setupDownloadButtons(brandName) {
    // SVG下载
    document.getElementById('download-svg').addEventListener('click', function() {
        const svgData = document.querySelector('.logo-container svg').outerHTML;
        downloadFile(svgData, `${brandName}-logo.svg`, 'image/svg+xml');
    });
    
    // PNG下载
    document.getElementById('download-png').addEventListener('click', function() {
        const svgElement = document.querySelector('.logo-container svg');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 设置画布大小
        canvas.width = svgElement.width.baseVal.value;
        canvas.height = svgElement.height.baseVal.value;
        
        // 创建Image对象
        const image = new Image();
        image.onload = function() {
            // 将图像绘制到画布
            ctx.drawImage(image, 0, 0);
            
            // 转换为PNG并下载
            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${brandName}-logo.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        };
        
        // 将SVG转换为DataURL
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);
        
        image.src = url;
    });
} 