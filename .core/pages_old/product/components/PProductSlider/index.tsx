import { observer } from "mobx-react";

import { UiSlider } from "shared/uikit";

import './index.scss';

type PropsType = {
    items: string[]
}

export const PProductSlider = observer(({ items }: PropsType) => {
    return (
        <UiSlider
            loop
            items={items}
            slideClassName='p-product-slider-slide'
            renderItem={(item) => (
                <div
                    className="p-product-slider-slide__image"
                    style={{ backgroundImage: `url(${item})` }}
                />
            )}
            autoHeight={false}
            renderNavigation={(navigation) => {
                if (navigation.dotsCount() < 2) {
                    return null;
                }
                return (
                    <div className='p-product-slider-navigation'>
                        <div className="p-product-slider-navigation__dots">
                            {navigation.dots('p-product-slider-navigation__dot')}
                        </div>
                    </div>
                )
            }}
        />
    )
});
