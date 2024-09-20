export declare function Language_card(): {
    type: string;
    $schema: string;
    version: string;
    body: ({
        type: string;
        text: string;
        wrap: boolean;
        actions?: undefined;
    } | {
        type: string;
        actions: {
            type: string;
            title: string;
        }[];
        text?: undefined;
        wrap?: undefined;
    })[];
};
