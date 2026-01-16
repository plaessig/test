type Column = {
    html: string;
    isImageCol?: boolean;
};

type ColumnsProps = {
    rows: Column[][];
};

function isImageColumn(cell: HTMLElement): boolean {
    return !!cell.querySelector('img, picture');
}

function isConfigRow(row: Element): boolean {
    const first = row.children[0] as HTMLElement | undefined;
    if (!first) return false;

    const text = (first.textContent || '').trim().toLowerCase();

    return [
        'reverse on desktop',
        'theme',
        'variant',
        'layout',
    ].includes(text);
}

export function extractColumnsData(block: Element): ColumnsProps {
    const rows = [...block.children];

    const contentRows = rows.filter((row) => !isConfigRow(row));

    const parsedRows: Column[][] = contentRows.map((row) => {
        const cells = [...row.children] as HTMLElement[];

        return cells
            .map((cell) => {
                const html = (cell.innerHTML || '').trim();
                if (!html) return null;

                return {
                    html,
                    isImageCol: isImageColumn(cell),
                };
            })
            .filter(Boolean) as Column[];
    });

    return { rows: parsedRows };
}
