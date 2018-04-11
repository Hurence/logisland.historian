<#import "/spring.ftl" as spring>
<html>
<h1>My products</h1>
<ul>
    <#list products as product>
        <li>${product}</li>
    </#list>
</ul>
<p>
    <a href="/logout">Logout</a>
</p>
</html>