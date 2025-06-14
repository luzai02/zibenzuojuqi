document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const resultContainer = document.getElementById('resultContainer');
    const finalResultContainer = document.getElementById('finalResultContainer');
    const secondMessage = document.getElementById('secondMessage');
    const restartBtn = document.getElementById('restartBtn');
    const inputGroup = document.querySelector('.input-group');
    
    let isFirstTime = true;startBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (!name || !phone) {
            alert('请填写姓名和手机号');
            return;
        }

        // 隐藏输入框，显示进度条
        inputGroup.style.display = 'none';
        progressContainer.style.display = 'block';
        
        // 根据是否是第一次做局来决定最终显示的内容

        // 开始上传
        let progress = 0;
        const totalTime = 10000; // 10秒
        const interval = 50; // 更新间隔

        const updateProgress = () => {
            const currentTime = Date.now() - startTime;
            
            if (currentTime <= 5000) {
                // 前5秒，上传进度达到98%
                progress = (currentTime / 5000) * 98;
            } else if (currentTime <= 8000) {
                // 5-8秒保持上传进度98%
                progress = 98;
            } else if (currentTime <= 9000) {
                // 8-9秒上传进度达到99%
                progress = 98 + (currentTime - 8000) / 1000;
            } else if (currentTime < totalTime) {
                // 9-10秒上传进度保持99%
                progress = 99;
            } else {
                // 10秒后完成上传                progress = 100;
                clearInterval(progressInterval);
                progressContainer.style.display = 'none';
                
                if (isFirstTime) {
                    resultContainer.style.display = 'block';
                    secondMessage.style.display = 'block';
                } else {
                    finalResultContainer.style.display = 'block';
                    secondMessage.style.display = 'block';
                }
                return;
            }

            progressBar.style.width = `${progress}%`;
            progressText.textContent = currentTime <= 8000 ? '正在做局...' : '即将完成...';
        };

        const startTime = Date.now();
        const progressInterval = setInterval(updateProgress, interval);
    });    // 重新做局按钮点击事件
    restartBtn.addEventListener('click', () => {
        resultContainer.style.display = 'none';
        finalResultContainer.style.display = 'none';
        secondMessage.style.display = 'none';
        inputGroup.style.display = 'flex';
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        isFirstTime = false;
    });
});
