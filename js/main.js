// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化样式选择功能
    initStyleSelection();
    
    // 初始化Logo生成表单
    initLogoForm();
    
    // 初始化画廊功能
    initGallery();
    
    // 添加更多画廊功能
    addMoreGalleryFeatures();
});

// 初始化样式选择功能
function initStyleSelection() {
    document.querySelectorAll('.style-option').forEach(option => {
        option.addEventListener('click', function() {
            // 移除之前的选择
            document.querySelectorAll('.style-option').forEach(el => {
                el.classList.remove('selected');
            });
            
            // 添加新的选择
            this.classList.add('selected');
            
            // 更新隐藏字段的值
            document.getElementById('style').value = this.getAttribute('data-style');
        });
    });
}

// 初始化Logo生成表单
function initLogoForm() {
    document.getElementById('logo-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 显示加载动画
        document.getElementById('loading').style.display = 'block';
        document.getElementById('logo-result').innerHTML = '';
        
        // 获取表单数据
        const brandName = document.getElementById('brand-name').value;
        const description = document.getElementById('description').value;
        const style = document.getElementById('style').value;
        
        // 生成Logo (模拟API调用)
        setTimeout(function() {
            // 隐藏加载动画
            document.getElementById('loading').style.display = 'none';
            
            // 生成基于用户输入的SVG Logo
            const logoSvg = generateLogoSvg(brandName, description, style);
            
            // 显示结果
            const resultHTML = `
                <h3>您生成的Logo</h3>
                <div class="logo-container">${logoSvg}</div>
                <p>基于描述生成: ${description}</p>
                <button id="download-svg" class="download-btn">下载SVG</button>
                <button id="download-png" class="download-btn">下载PNG</button>
            `;
            
            document.getElementById('logo-result').innerHTML = resultHTML;
            
            // 添加下载功能
            setupDownloadButtons(brandName);
        }, 1500); // 1.5秒生成时间
    });
}

// 初始化画廊功能
function initGallery() {
    document.querySelector('.view-more button').addEventListener('click', function() {
        // 显示更多Logo示例
        showExpandedGallery();
    });
}

// 通用文件下载函数
function downloadFile(data, fileName, mimeType) {
    const blob = new Blob([data], {type: mimeType});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
} 