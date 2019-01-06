import {parseString} from "nativescript-xml2js";

import {RawStringsMap} from "hey-hkul-hours/dist/service/validation/model/RawStringsMap";
import {HtmlParser} from "hey-hkul-hours";

export default class NativeHtmlParser implements HtmlParser {
    async parseHtml(html: string): Promise<RawStringsMap> {
        return new Promise((resolve, reject) => {
            parseString(html, {explicitChildren: true, ignoreAttrs: true}, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(result);
                    resolve(result);
                }
            });
        })
            .then(result => (result as any).div.$$.table[0].$$.tr)
            .then(trs => trs.map(tr=>tr.$$))
            .then(rows => rows.reduce((obj, row) => {
                const [key, value] = row.td;

                // typeof result.div.table[0].tr[0].td[0]
                if (typeof key === "string") {
                    obj[key] = value;
                } else if (typeof key === "object") {
                    obj[key._] = value._;
                } else {
                    throw new Error(`Unable to parse key:"${key}" and value:"${value}" from html:"${html}"`);
                }

                return obj;
            }, {}));
    }
};
