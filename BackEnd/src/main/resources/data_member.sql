INSERT INTO `member` (
                       `created_at`
                     ,`updated_at`
                     ,`email`
                     ,`image`
                     ,`nickname`
                     ,`provider`
)
VALUES (
         NOW()
       ,NOW()
       ,'test1@test.com'
       ,NULL
       ,'테스트 1트'
       ,NULL

)
     ,(
        NOW()
      ,NOW()
      ,'test2@test.com'
      ,NULL
      ,'테스트 2트'
      ,NULL
)
     ,(
        NOW()
      ,NOW()
      ,'test3@test.com'
      ,NULL
      ,'테스트 3트'
      ,NULL
)
     ,(
        NOW()
      ,NOW()
      ,'test4@test.com'
      ,NULL
      ,'테스트 4트'
      ,NULL
);