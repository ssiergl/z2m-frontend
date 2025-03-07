import React, { FunctionComponent, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { CompositeFeature, GenericExposedFeature, Endpoint, FeatureAccessMode, DeviceState } from "../../../types";
import Button from "../../button";


export type FetatureWrapperProps = {
    feature: CompositeFeature | GenericExposedFeature;
    deviceState?: DeviceState;
    onRead(endpoint: Endpoint, property: Record<string, unknown>): void;
};
export const FeatureWrapper: FunctionComponent<PropsWithChildren<FetatureWrapperProps>> = (props) => {
    const { t } = useTranslation(['featureDescriptions']);
    const { children, feature, onRead } = props;
    const isColor = feature.name?.startsWith("color_"); //hardcode for color
    const isReadable = (feature.access & FeatureAccessMode.ACCESS_READ) || isColor;
    return <div className="row border-bottom py-1 w-100">
        <div className="col-12 col-md-3">
            <label className="col-form-label w-100">
                <div className="d-flex justify-content-between">
                    <strong title={JSON.stringify(feature)}>{feature.name}</strong>
                    {isReadable ? (
                        <Button<CompositeFeature | GenericExposedFeature> item={feature} onClick={(item) => {
                            onRead(feature.endpoint as Endpoint, { [item.property]: "" })
                        }} className="btn btn-primary btn-sm"><i className="fa fa-sync"></i></Button>
                    ) : null}
                </div>
                {feature.description ? <small className="d-block text-muted">{t(feature.description)}</small> : null}
            </label>
        </div>
        <div className="col-12 col-md-9 d-flex align-items-center">
            {children}
        </div>
    </div>
}



