import { observer } from 'mobx-react';
import React from 'react';
import Interface from 'ui/Interface';
import * as Components from 'js/Components';

export default @observer class HUD extends React.Component {
    constructor() {
        super();
        this.store = Interface.store;
    }
    getInventoryItems() {
        return this.store.items.map((item, i) => {
            return <div className="item" key={i}>
                <div className="image">
                    <img src={item.getComponent(Components.Renderer).sprite.texture.baseTexture.imageUrl} />
                </div>
            </div>
        });
    }
    getInteractionIcon() {
        let style = {};
        let name = '';
        if(this.store.useIndicator) {
            name = this.store.useIndicator.info.name;
            style = {
                left: this.store.useIndicator.x - 15,
                top: this.store.useIndicator.y - 30
            };
        } else {
            style = {
                opacity: 0
            };
        }

        return (<div className="interaction-icon" style={style}>{name}</div>);
    }
    render() {
        return (
            <div className="hud">
                {this.getInteractionIcon()}
                <div className="inventory">
                    {this.getInventoryItems()}
                </div>
            </div>
        );
    }
}
