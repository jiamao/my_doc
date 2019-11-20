
/**
 * 基金实体
 */
interface IFund { 
    /**
     * 基金代码
     * @default null
     */
    code: string, 
    /**
     * 基金名称
     */
    name: string,

    /**
     * 公司信息
     */
    company: {
        /**
         * 公司名称
         */
        name: string
    }
}

/**
 * 公司实体
 */
interface ICompany {
    /**
     * 公司名称
     */
    name: string
}

/**
 * 同步基金信息请求参数
 */
interface IReq {
    /**
     * 基金代码
     */
    code: string
}

/**
 * 基金信息同步接口
 */
interface fund {
    /**
     * 同步基金信息
     * @param code 基金代码
     * @param [optional] req 请求参数
     * @returns 基金实体信息，如果返回nul表示不存在
     * @author fefeding
     * @date 2019-11-20
     */
    sync_fund(code: string, req: {
        /**
         * 基金代码
         */
        code: string
    }): { 
        /**
         * 基金代码
         * @default null
         */
        code: string, 
        /**
         * 基金名称
         */
        name: string,
    
        /**
         * 公司信息
         */
        company: {
            /**
             * 公司名称
             */
            name: string,            
        },
        /**
         * 其它属性
         */
        attrs: Array<ICompany>
    }
}