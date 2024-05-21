import { Router } from 'express';

const router = Router();

// 기본 홈 페이지 라우트
router.get("/", (req, res) => {
    res.send("Welcome to the API");
});

/*  #swagger.path = '/'
    #swagger.tags = ['home']
    #swagger.summary = '홈 페이지 엔드포인트'
    #swagger.responses[200] = {
        description: '홈 페이지 응답',
        content: {
            "text/html": {
                schema: {
                    type: 'string',
                    example: 'Welcome to the API'
                }
            }
        }
    }
*/

export default router;
