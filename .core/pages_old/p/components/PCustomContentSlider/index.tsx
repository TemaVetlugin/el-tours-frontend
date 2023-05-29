import { observer } from "mobx-react";

import { UiSlider } from "shared/uikit";

import './index.scss';

type PropsType = {
    items: string[]
}

export const PCustomContentSlider = observer(({ items }: PropsType) => {
    return (
        <div className="p-custom-content-slider">
            <UiSlider
                loop
                perPage={'auto'}
                items={items}
                gap={24}
                renderItem={(image) => (
                    <div
                        key={image}
                        className='p-custom-content-slider-item'
                        style={{ backgroundImage: `url(${image})` }}
                    />
                )}
                renderNavigation={(navigation) => (
                    <div className="p-custom-content-slider__dots">
                        {navigation.dots('p-custom-content-slider__dot')}
                    </div>
                )}
            />
        </div>
    )
});
