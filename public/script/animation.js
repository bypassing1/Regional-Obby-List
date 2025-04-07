function createAnimationContainer(type) {
    const container = document.createElement('div');
    container.className = `animation-container ${type}-container`;
    container.id = `${type}Container`;

    const svgContainer = document.createElement('div');
    svgContainer.className = 'svg-container';

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('xmlns', svgNS);
    svg.setAttribute('viewBox', '0 0 52 52');
    svg.classList.add(type === 'success' ? 'checkmark' : 'x-mark');

    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', '26');
    circle.setAttribute('cy', '26');
    circle.setAttribute('r', '25');
    circle.setAttribute('fill', 'none');
    circle.classList.add(type === 'success' ? 'checkmark-circle' : 'x-mark-circle');
    svg.appendChild(circle);

    if (type === 'success') {
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('fill', 'none');
        path.setAttribute('d', 'M14.1 27.2l7.1 7.2 16.7-16.8');
        path.classList.add('checkmark-check');
        svg.appendChild(path);
    } else {
        const path1 = document.createElementNS(svgNS, 'path');
        path1.setAttribute('fill', 'none');
        path1.setAttribute('d', 'M16 16 36 36');
        path1.classList.add('x-mark-line');
        svg.appendChild(path1);

        const path2 = document.createElementNS(svgNS, 'path');
        path2.setAttribute('fill', 'none');
        path2.setAttribute('d', 'M36 16 16 36');
        path2.classList.add('x-mark-line');
        svg.appendChild(path2);
    }

    svgContainer.appendChild(svg);
    container.appendChild(svgContainer);

    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = type === 'success' ? 'Successful!' : 'Failed';
    container.appendChild(message);

    document.body.appendChild(container);

    return container;
}

const successContainer = createAnimationContainer('success');
const failContainer = createAnimationContainer('fail');

function showAnimation(container, message) {
    const svgContainer = container.querySelector('.svg-container');
    const oldSvg = svgContainer.querySelector('svg');
    const newSvg = oldSvg.cloneNode(true);
    svgContainer.replaceChild(newSvg, oldSvg);

    const messageElement = container.querySelector('.message');
    messageElement.textContent = message;

    container.classList.add('show');
    setTimeout(() => {
        container.classList.remove('show');
    }, 3000);
}

function checkmark(caption = 'Successful!') {
    showAnimation(successContainer, caption);
}

function fail(caption = 'Failed') {
    showAnimation(failContainer, caption);
}