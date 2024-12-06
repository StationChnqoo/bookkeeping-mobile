import {useCaches} from '@src/stores';
import axios, {AxiosInstance} from 'axios';
import * as AxiosLogger from 'axios-logger';
import {SHA256} from 'crypto-js';
import Config from 'react-native-config';
import Envs from './Envs';
import {EnvKeys} from './Interfaces';

export default class Services {
  instance: AxiosInstance = null;
  constructor() {
    this.instance = axios.create({
      // baseURL: Config.SERVER,
      baseURL: new Envs().get(EnvKeys.HOST),
      timeout: 10000,
      headers: {
        token: useCaches.getState().user?.token || '--',
      },
    });
    let couldPrintPaths = [];
    // 添加白名单机制
    if (couldPrintPaths.length > 0) {
      this.instance.interceptors.request.use(request => {
        return AxiosLogger.requestLogger(request, {
          prefixText: 'react-native/axios',
          dateFormat: 'yyyy-mm-dd HH:MM:ss',
          params: true,
          headers: true,
          method: true,
        });
      });
    }
    this.instance.interceptors.response.use(response => {
      return response;
    });
  }

  async selectLogin(code: string, password: string) {
    let s = SHA256(`${code}:${password}`);
    let result = await this.instance.get(
      `/api/share/login?code=${code}&password=${password}&s=${s}`,
    );
    return result.data;
  }

  async selectPlans(page: number) {
    let result = await this.instance.get(
      `/api/wallet/plan/selectPlans?page=${page}&pageSize=10`,
    );
    return result.data;
  }

  async upload(datas: {id: string; idQoo: number | never; file: any}) {
    let form = new FormData();
    Object.keys(datas).map(it => {
      form.append(it, datas[it]);
    });
    this.instance.defaults.baseURL = Config.COMMON_SERVER;
    // this.instance.defaults.headers = {'Content-Type': 'multipart/form-data'};
    let result = await this.instance.post('/fileUploader', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result.data;
  }

  async testBaidu() {
    this.instance.defaults.baseURL = 'https://www.baidu.com';
    // this.instance.defaults.headers = {'Content-Type': 'multipart/form-data'};
    let result = await this.instance.get('/');
    return result.data;
  }

  /**
   * 首页三大指数涨跌家数
   * @returns
   */
  async selectDfcfFundCounts() {
    this.instance.defaults.baseURL = 'https://push2.eastmoney.com';
    this.instance.defaults.headers['referer'] =
      'https://data.eastmoney.com/zjlx/dpzjlx.html';
    let result = await this.instance.get(
      '/api/qt/ulist.np/get?cb=&fltt=2&secids=1.000001%2C0.399001&fields=f1%2Cf2%2Cf3%2Cf4%2Cf6%2Cf12%2Cf13%2Cf104%2Cf105%2Cf106',
    );
    return result.data;
  }

  /**
   * 指数的实时净值
   * @param code
   */
  async selectDfcfFundValues(code: string) {
    this.instance.defaults.baseURL = 'https://push2.eastmoney.com';
    this.instance.defaults.headers[
      'referer'
    ] = `https://so.eastmoney.com/web/s?keyword=${code}`;
    let result = await this.instance.get(
      `/api/qt/stock/get?cb=&fields=f57%2Cf58%2Cf59%2Cf152%2Cf43%2Cf169%2Cf170%2Cf60%2Cf44%2Cf45%2Cf168%2Cf50%2Cf47%2Cf48%2Cf49%2Cf46%2Cf78%2Cf85%2Cf86%2Cf169%2Cf117%2Cf107%2Cf111%2Cf116%2Cf117%2Cf118%2Cf163%2Cf171%2Cf113%2Cf114%2Cf115%2Cf161%2Cf162%2Cf164%2Cf168%2Cf172%2Cf177%2Cf180%2Cf181%2Cf292%2Cf751%2Cf752&secid=${code}&invt=2`,
    );
    return result.data;
  }

  async selectDfcfStockSearcher(s: string) {
    // /codetable/search/web?client=web&clientType=webSuggest&clientVersion=lastest&cb=&keyword=512&pageIndex=1&pageSize=20&securityFilter=
    this.instance.defaults.baseURL = 'https://search-codetable.eastmoney.com';
    this.instance.defaults.headers[
      'referer'
    ] = `https://www.eastmoney.com/default.html`;
    let result = await this.instance.get(
      `/codetable/search/web?client=web&clientType=webSuggest&clientVersion=lastest&cb=&keyword=${s}&pageIndex=1&pageSize=20&securityFilter=`,
    );
    return result.data;
  }

  /**
   * 行业板块涨跌幅
   * @returns
   */
  async selectDfcfFundRanks() {
    this.instance.defaults.baseURL = 'https://push2.eastmoney.com';
    this.instance.defaults.headers[
      'referer'
    ] = `https://data.eastmoney.com/bkzj/hy_5.html`;
    let result = await this.instance.get(
      `/api/qt/clist/get?cb=&fid=f62&po=1&pz=99&pn=1&np=1&fltt=2&invt=2&fs=m%3A90+t%3A2&fields=f12%2Cf14%2Cf2%2Cf3%2Cf62%2Cf184%2Cf66%2Cf69%2Cf72%2Cf75%2Cf78%2Cf81%2Cf84%2Cf87%2Cf204%2Cf205%2Cf124%2Cf1%2Cf13`,
    );
    return result.data;
  }

  /**
   * 走势
   * @param code
   * @returns
   */
  async selectDfcfFundTrends(code: string) {
    this.instance.defaults.baseURL = 'https://push2.eastmoney.com';
    this.instance.defaults.headers[
      'referer'
    ] = `https://quote.eastmoney.com/center/hszs.html`;
    let result = await this.instance.get(
      `/api/qt/stock/trends2/get?secid=${code}&fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58&iscr=0&cb=&isqhquote=`,
    );
    return result.data;
  }

  /**
   * 天天基金详情
   * @param code
   * @returns
   */
  async selectTianTianFundDetail(code: string) {
    this.instance.defaults.baseURL = 'https://fundcomapi.tiantianfunds.com';
    this.instance.defaults.headers['referer'] = `https://h5.1234567.com.cn/`;
    this.instance.defaults.headers['Content-Type'] =
      'application/x-www-form-urlencoded';
    let result = await this.instance.post(`/mm/newCore/FundCoreDiyNew`, {
      deviceid: '1234567.py.service',
      product: 'EFund',
      plat: 'Iphone',
      FCODES: code,
      // version: '6.5.5',
      // appVersion: '6.5.5',
      FIELDS:
        'SHORTNAME,RZDF,DWJZ,LJJZ,SYL_1N,SYL_LN,FSRQ,ISBUY,DTZT,FTYPE,FCODE,ISSALES,ISSBDATE,ISSEDATE,TSRQ,BACKCODE,MINSG,MINSBSG,SHZT,SGZT,SOURCERATE,RATE,REALSGCODE,FEATURE,SYL,MINRG,SYL_Z,BFUNDTYPE,QDTCODE,MINDT,BAGTYPE,FUNDTYPE,BENCH,ESTABDATE,,SELLSTATE,ESTDIFF,SYSDATE,PTYPE,FUNDTYPE,ISEXCHG,ISNEW,BTYPE',
    });
    return result.data;
  }

  /**
   * 场内ETF交易详情
   * @param code
   */
  async selectEtfDetail(code: string) {
    return await this.selectDfcfFundValues(code);
  }

  /**
   * 外围股市涨跌
   * @param indexes
   * @returns
   */
  async selectOtherCountryStocks(indexes: string[]) {
    this.instance.defaults.baseURL = 'https://push2.eastmoney.com';
    this.instance.defaults.headers['referer'] = `https://www.eastmoney.com/`;
    this.instance.defaults.headers['Content-Type'] =
      'application/x-www-form-urlencoded';
    let result = await this.instance.get(
      `/api/qt/ulist/get?fields=f13%2Cf12%2Cf14%2Cf1%2Cf2%2Cf4%2Cf3%2Cf152&secids=${indexes.join(
        ',',
      )}&pn=1&np=1&pz=100`,
    );
    // console.log('selectOtherCountryStocks: ', result.data)
    return result.data;
  }

  /**
   * 黄金
   * https://quote.eastmoney.com/globalfuture/GC00Y.html
   */
  async selectGoldCOMEX() {
    this.instance.defaults.baseURL = 'https://futsseapi.eastmoney.com';
    this.instance.defaults.headers[
      'referer'
    ] = `https://quote.eastmoney.com/globalfuture/GC00Y.html`;
    this.instance.defaults.headers['Content-Type'] =
      'application/x-www-form-urlencoded';
    let result = await this.instance.get(
      `/static/101_GC00Y_qt?callbackName=&field=name,sc,dm,p,zsjd,zdf,zde,utime,o,zjsj,qrspj,h,l,mrj,mcj,vol,cclbh,zt,dt,np,wp,ccl,rz,cje,mcl,mrl,jjsj,j,lb,zf`,
    );
    return JSON.parse(result.data.match(/\((.*)\)/)[1]);
  }
}
