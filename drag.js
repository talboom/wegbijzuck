function makeElementDraggable(element) {
    let offsetX = 0, offsetY = 0, startX = 0, startY = 0;
    let isResizing = false;
    let currentHandle = null;
    let startWidth = 0, startHeight = 0;

    element.onmousedown = startDragging;
    const handles = element.querySelectorAll('.resize-handle');
    handles.forEach(handle => {
        handle.onmousedown = startResizing;
    });

    function startDragging(e) {
        // Check if the clicked element or its ancestors are resize handles
        if (e.target.closest('.resize-handle')) return;
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = drag;
    }

    function startResizing(e) {
        e.preventDefault();
        e.stopPropagation();
        isResizing = true;
        currentHandle = e.target.dataset.handle;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = element.offsetWidth;
        startHeight = element.offsetHeight;
        startLeft = element.offsetLeft;
        startTop = element.offsetTop;
        document.onmouseup = stopDragging;
        document.onmousemove = resize;
    }

    function resize(e) {
        if (!isResizing) return;
        e.preventDefault();

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        const previewRect = document.getElementById('imagePreview').getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        
        let newWidth = startWidth;
        let newHeight = startHeight;
        let newLeft = element.offsetLeft;
        let newTop = element.offsetTop;

        // Calculate the right and bottom positions
        const right = newLeft + startWidth;
        const bottom = newTop + startHeight;

        switch(currentHandle) {
            case 'nw':
                // Keep bottom-right corner fixed
                newWidth = startWidth - dx;
                newHeight = startHeight - dy;
                newLeft = startLeft + dx;
                newTop = startTop + dy;
                break;
            case 'ne':
                newWidth = startWidth + dx;
                newHeight = startHeight - dy;
                newTop = startTop + dy;
                break;
            case 'sw':
                newWidth = startWidth - dx;
                newHeight = startHeight + dy;
                newLeft = startLeft + dx;
                break;
            case 'se':
                newWidth = startWidth + dx;
                newHeight = startHeight + dy;
                break;
        }

        // Ensure minimum size and containment
        const minSize = 100;
        if (newWidth >= minSize && newHeight >= minSize &&
            newLeft >= 0 && newTop >= 0 &&
            newLeft + newWidth <= previewRect.width &&
            newTop + newHeight <= previewRect.height) {
            element.style.width = `${newWidth}px`;
            element.style.height = `${newHeight}px`;
            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;
        }
        console.log(dx, dy);
        console.log(newWidth, newHeight, newLeft, newTop);
    }

    function drag(e) {
        if (isResizing) return;
        console.log('drag');
        e.preventDefault();
        const previewRect = document.getElementById('imagePreview').getBoundingClientRect();
        if (e.clientX < previewRect.left || e.clientX > previewRect.right || e.clientY < previewRect.top || e.clientY > previewRect.bottom) {
            return;
        }
        offsetX = startX - e.clientX;
        offsetY = startY - e.clientY;
        startX = e.clientX;
        startY = e.clientY;
        const elementRect = element.getBoundingClientRect();
        let left = element.offsetLeft - offsetX;
        let top = element.offsetTop - offsetY;
        if (left < 0) left = 0;
        if (left + elementRect.width > previewRect.width) left = previewRect.width - elementRect.width;
        if (top < 0) top = 0;
        if (top + elementRect.height > previewRect.height) top = previewRect.height - elementRect.height;
        element.style.top = top + "px";
        element.style.left = left + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
        isResizing = false;
        currentHandle = null;
    }
}
