// 显示扩展画廊功能
function showExpandedGallery() {
    // 创建模态窗口
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    
    // 添加关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '关闭';
    closeBtn.className = 'close-btn';
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // 创建画廊内容
    const galleryContent = document.createElement('div');
    galleryContent.className = 'gallery-content';
    
    // 添加标题
    const title = document.createElement('h2');
    title.textContent = 'Logo画廊';
    title.style.textAlign = 'center';
    title.style.marginBottom = '30px';
    galleryContent.appendChild(title);
    
    // 创建画廊网格
    const grid = document.createElement('div');
    grid.className = 'gallery-grid';
    
    // 添加示例Logo
    const exampleLogos = [
        { name: '叶子Logo', type: 'hasNature' },
        { name: '波浪Logo', type: 'hasWater' },
        { name: '山峰Logo', type: 'hasMountain' },
        { name: '几何Logo', type: 'hasGeometric' },
        { name: '抽象Logo', type: 'hasAbstract' },
        { name: '极简Logo', type: 'default' },
        { name: '圆形Logo', type: 'hasGeometric' },
        { name: '线条Logo', type: 'hasAbstract' },
        { name: '方形Logo', type: 'hasGeometric' },
        { name: '水滴Logo', type: 'hasWater' },
        { name: '树Logo', type: 'hasNature' },
        { name: '现代Logo', type: 'hasAbstract' }
    ];
    
    // 生成画廊项目
    exampleLogos.forEach(logo => {
        const item = document.createElement('div');
        item.style.border = '1px solid #ddd';
        item.style.padding = '20px';
        item.style.textAlign = 'center';
        
        // 使用相同的Logo生成函数创建SVG
        let svg;
        if (logo.type === 'hasNature') {
            svg = generateLogoSvg(logo.name, '自然 叶子', 'minimal');
        } else if (logo.type === 'hasWater') {
            svg = generateLogoSvg(logo.name, '水 波浪', 'minimal');
        } else if (logo.type === 'hasMountain') {
            svg = generateLogoSvg(logo.name, '山 峰', 'minimal');
        } else if (logo.type === 'hasGeometric') {
            svg = generateLogoSvg(logo.name, '几何', 'geometric');
        } else if (logo.type === 'hasAbstract') {
            svg = generateLogoSvg(logo.name, '抽象', 'abstract');
        } else {
            svg = generateLogoSvg(logo.name, '', 'minimal');
        }
        
        item.innerHTML = svg;
        
        const name = document.createElement('p');
        name.textContent = logo.name;
        name.style.marginTop = '10px';
        item.appendChild(name);
        
        grid.appendChild(item);
    });
    
    galleryContent.appendChild(grid);
    modal.appendChild(galleryContent);
    modal.appendChild(closeBtn);
    
    document.body.appendChild(modal);
}

// 添加更多画廊功能
function addMoreGalleryFeatures() {
    // 为每个画廊项目添加点击事件，显示大图
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const svgContent = this.querySelector('svg').outerHTML;
            const logoName = this.querySelector('text').textContent;
            
            // 创建模态窗口显示大图
            const modal = document.createElement('div');
            modal.className = 'gallery-modal';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            
            // 添加关闭按钮
            const closeBtn = document.createElement('button');
            closeBtn.textContent = '关闭';
            closeBtn.className = 'close-btn';
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // 创建内容容器
            const container = document.createElement('div');
            container.style.textAlign = 'center';
            container.style.backgroundColor = '#fff';
            container.style.padding = '30px';
            container.style.borderRadius = '5px';
            container.style.maxWidth = '80%';
            
            // 添加Logo
            const logoContainer = document.createElement('div');
            logoContainer.className = 'logo-container';
            logoContainer.style.width = '400px';
            logoContainer.style.height = '400px';
            logoContainer.innerHTML = svgContent;
            
            // 添加标题
            const title = document.createElement('h2');
            title.textContent = logoName;
            title.style.marginTop = '20px';
            
            // 添加下载按钮
            const downloadSvgBtn = document.createElement('button');
            downloadSvgBtn.textContent = '下载SVG';
            downloadSvgBtn.className = 'download-btn';
            downloadSvgBtn.addEventListener('click', function() {
                const svgData = logoContainer.querySelector('svg').outerHTML;
                downloadFile(svgData, `${logoName}-logo.svg`, 'image/svg+xml');
            });
            
            container.appendChild(logoContainer);
            container.appendChild(title);
            container.appendChild(downloadSvgBtn);
            
            modal.appendChild(container);
            modal.appendChild(closeBtn);
            
            document.body.appendChild(modal);
        });
    });
} 