
/** not working yet **/

export function extractFooterData(block: Element) {
    const year = new Date().getFullYear();

    const cells = Array.from(block.querySelectorAll('td'));

    const leftRaw = (cells[0]?.textContent || '').trim();
    const right = (cells[1]?.innerHTML || '').trim();

    return {
        left: leftRaw ? `${leftRaw} ${year}` : `${year}`,
        right,
    };
}
