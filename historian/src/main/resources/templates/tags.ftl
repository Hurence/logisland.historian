<#import "/spring.ftl" as spring>

    <html>
    <h1>tags</h1>
    <p>Request time : ${requestTime}</p>
    <ul>
        <#list tags as tag>
            <li>${tag.getId()}</li>
        </#list>
    </ul>
    <p>
        <a href="/logout">Logout</a>
    </p>
    </html>