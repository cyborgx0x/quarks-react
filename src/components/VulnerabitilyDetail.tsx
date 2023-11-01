import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import { TemplateInfo } from '../type';



export default function TemplateInfoCard({ templateInfo }: { templateInfo: TemplateInfo }) {
    const {
        template,
        'template-url': templateUrl,
        'template-id': templateId,
        recommendation,
        info: {
            name,
            author,
            tags,
            description,
            reference,
            severity,
            metadata: { 'max-request': maxRequest },

        },
        type,
        host,
        'matched-at': matchedAt,
        'extracted-results': extractedResults,
        request,
        response,
        timestamp,
        'matcher-status': matcherStatus,
    } = templateInfo;

    return (
        <Card>
            <CardContent>

                <Typography variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {template}
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Template URL" secondary={templateUrl} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Template ID" secondary={templateId} />
                    </ListItem>

                    <ListItem>
                        <ListItemText primary="Author" secondary={author.join(', ')} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Tags" secondary={tags.join(', ')} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Description" secondary={description} />
                    </ListItem>
                    {recommendation &&
                        <ListItem>
                            <ListItemText primary="Khuyến nghị" secondary={recommendation} />
                        </ListItem>
                    }
                    {reference &&

                        <ListItem>
                            <ListItemText primary="Reference" secondary={reference.join(', ')} />
                        </ListItem>
                    }
                    <ListItem>
                        <ListItemText primary="Severity" secondary={severity} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Max Request" secondary={maxRequest} />
                    </ListItem>

                    <ListItem>
                        <ListItemText primary="Type" secondary={type} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Host" secondary={host} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Matched At" secondary={matchedAt} />
                    </ListItem>
                    {extractedResults &&

                        <ListItem>
                            <ListItemText primary="Extracted Results" secondary={extractedResults.join(', ')} />
                        </ListItem>
                    }
                    <ListItem>
                        <code>
                            {request}

                        </code>
                    </ListItem>
                    <ListItem>
                        <code>
                            {response}
                        </code>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Timestamp" secondary={timestamp} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Matcher Status" secondary={matcherStatus ? 'Matched' : 'Not matched'} />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}