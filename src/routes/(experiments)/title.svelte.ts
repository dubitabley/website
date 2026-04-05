let titleComponents: string[] = $state([]);

export function getTitleComponents(): string[] {
    return titleComponents;
}

export function setTitleLevel(index: number, component: string) {
    titleComponents[index] = component;
}

export function deleteTitleLevel(index: number) {
    for (
        let removeIndex = titleComponents.length - 1;
        removeIndex >= index;
        removeIndex--
    ) {
        titleComponents.pop();
    }
}
