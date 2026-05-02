package com.edukini.edukini_backend.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    // 1. @Before : s'exécute AVANT la méthode
    @Before("execution(* com.edukini.edukini_backend.service.*.*(..))")
    public void logBeforeMethod(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        logger.info("🔵 [BEFORE] Appel de {}.{}()", className, methodName);
    }

    // 2. @AfterReturning : s'exécute APRÈS succès 
    @AfterReturning(pointcut = "execution(* com.edukini.edukini_backend.service.*.*(..))", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        logger.info(" [AFTER RETURNING] {}.{}() retourne : {}", className, methodName, result);
    }

    // 3. @AfterThrowing : s'exécute si exception
    @AfterThrowing(pointcut = "execution(* com.edukini.edukini_backend.service.*.*(..))", throwing = "error")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable error) {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        logger.error(" [AFTER THROWING] {}.{}() erreur : {}", className, methodName, error.getMessage());
    }
}