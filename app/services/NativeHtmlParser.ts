import {parseString} from "nativescript-xml2js";

import {RawStringsMap} from "hey-hkul-hours/dist/service/validation/model/RawStringsMap";
import {HtmlParser} from "hey-hkul-hours";

export default class NativeHtmlParser implements HtmlParser {
    async parseHtml(html: string): Promise<RawStringsMap> {
        return promiseParseString(html)
            .then(extractAllRows)
            .then(mapRowsToStringsMap);

        function promiseParseString(html: string) {
            return new Promise((resolve, reject) =>
                parseString(html, {explicitChildren: true, ignoreAttrs: true}, (err, result) => {
                    if (err) {
                        console.log(`Error caught @ NativeHtmlParser.parseHtml: ${err}`);
                        reject(err);
                    } else {
                        console.log(`Parsing html @ NativeHtmlParser.parseHtml: ${html}`);
                        resolve(result);
                    }
                })
            )
        }

        function extractAllRows(result) {
            const allTrs = (result as any).div.$$.table[0].$$.tr;
            return allTrs.map(tr => tr.$$);
        }

        function mapRowsToStringsMap(rows) {
            return rows.reduce(addRowToMap, {})
        }

        function addRowToMap(obj, row) {
            const [key, value] = row.td;
            console.log(`Adding key:"${key}" and value:"${value}" to map`);

            if (typeof key === "string") {
                obj[key] = value;
            } else if (typeof key === "object") {
                obj[key._] = value._;
            } else {
                throw new Error(`Unable to parse key:"${key}" and value:"${value}" from html:"${html}"`);
            }

            return obj;
        }
    }
};