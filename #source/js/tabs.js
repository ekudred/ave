class Tab {
    constructor(tabs, tabsContent, classTabActive, classTabContentActive) {
        this.tabs = document.querySelectorAll(tabs);
        this.tabsContent = document.querySelectorAll(tabsContent);
        this.tabActive = classTabActive;
        this.tabContentActive = classTabContentActive;
        
        this.addIndex();
        this.clickHandler();
        this.hook();
    };

    addIndex() {
        this.tabs.forEach((tab, index) => {
            tab.dataset.index = index;
        });

        this.tabsContent.forEach((tabContent, index) => {
            tabContent.dataset.index = index;
        });
    };

    clickHandler() {
        const itemsRemove = (item, itemClass) => {
            item.forEach(function(item) {
                item.classList.remove(itemClass);
            });
        };
 
        this.tabs.forEach((currentTab) => {
            currentTab.addEventListener('click', () => {
                if (!currentTab.classList.contains(this.tabActive)) {
                    itemsRemove(this.tabs, this.tabActive);
                    itemsRemove(this.tabsContent, this.tabContentActive);

                    this.tabsContent.forEach((tabContent) => {
                        if (currentTab.dataset.index === tabContent.dataset.index) {
                            tabContent.classList.add(this.tabContentActive);
                            currentTab.classList.add(this.tabActive);
                        };
                    });
                };
            });
        });
    };

    hook() {
        this.tabs[0].click();
    };
};

const tab = new Tab (
    '.product-tab',
    '.tab-content',
    'product-tab-active',
    'tab-content-active'
);